class App {
  constructor() {
    this.storyManager = new StoryManager();
    this.characterManager = new CharacterManager();
    this.backgroundManager = new BackgroundManager();
    this.dashboard = new Dashboard();
    this.quizzes = {};

    this.currentChapter = null;
    this.currentKnot = null;
    this.isTyping = false;
    this.inQuizMode = false;
    this.currentText = "";
    this.typewriterSpeed = 30;

    this.init();
  }

  async init() {
    await this.loadQuizzes();
    await this.storyManager.loadStory("./stories/marx-quest.json");

    this.setupStoryObservers();
    this.attachEventListeners();

    console.log("Visual Novel App initialized successfully");
  }

  async loadQuizzes() {
    try {
      const response = await fetch("./data/quizzes.json");
      this.quizzes = await response.json();
    } catch (error) {
      console.error("Error loading quizzes:", error);
    }
  }

  attachEventListeners() {
    document.getElementById("backToDashboard").addEventListener("click", () => {
      this.showView("dashboardView");
    });

    document
      .getElementById("visualNovelView")
      .addEventListener("click", (e) => {
        if (
          !e.target.closest(".choice-btn") &&
          !e.target.closest("#storyChoices")
        ) {
          this.handleClick();
        }
      });

    document.addEventListener("keydown", (e) => {
      if (e.code === "Space" || e.code === "Enter") {
        this.handleClick();
      }
    });
  }

  setupStoryObservers() {
    if (!this.storyManager.story) return;

    try {
      this.storyManager.observeVariable(
        "player_moral_choice",
        (varName, newValue) => {
          console.log(`Player moral alignment: ${newValue}`);
        }
      );
    } catch (e) {
      console.log("player_moral_choice not defined yet");
    }

    try {
      this.storyManager.observeVariable(
        "mary_relationship",
        (varName, newValue) => {
          console.log(`Relationship with Mary: ${newValue}`);
        }
      );
    } catch (e) {
      console.log("mary_relationship not defined yet");
    }
  }

  handleClick() {
    // Vô hiệu hóa click khi đang trong quiz mode
    if (this.inQuizMode) {
      return;
    }

    if (this.isTyping) {
      this.skipTyping();
      return;
    }
    this.showNextChunk();
  }

  async startChapter(knotName, chapterId) {
    this.currentChapter = chapterId;
    this.currentKnot = knotName;
    this.showView("visualNovelView");

    this.storyManager.story.ChoosePathString(knotName);
    await this.showNextChunk();
  }

  async showNextChunk() {
    this.hideChoices();

    if (this.storyManager.story.canContinue) {
      const text = this.storyManager.story.Continue();
      const currentTags = this.storyManager.story.currentTags;

      await this.processStoryChunk(text, currentTags);
    } else {
      this.handleStoryEnd();
    }
  }

  async processStoryChunk(text, tags = []) {
    const parsed = this.parseTagsFromArray(tags);

    if (parsed.background) {
      this.backgroundManager.setBackground(parsed.background);
    }

    if (parsed.character) {
      this.characterManager.showCharacter(parsed.character);
    }

    await this.typewriterEffect(text);
  }

  parseTagsFromArray(tags) {
    const result = { background: null, character: null, speaker: null };
    const knownTags = ["bg:", "character:", "speaker:"];

    tags.forEach((tag) => {
      if (tag.startsWith("bg:")) {
        result.background = tag.replace("bg:", "").trim();
      } else if (tag.startsWith("character:")) {
        result.character = tag.replace("character:", "").trim();
      } else if (tag.startsWith("speaker:")) {
        result.speaker = tag.replace("speaker:", "").trim();
      } else {
        // 🔔 Cảnh báo nếu có tag không được xử lý
        const isUnknownTag = !knownTags.some((knownTag) =>
          tag.startsWith(knownTag)
        );
        if (isUnknownTag) {
          console.warn(`⚠️ Tag chưa được xử lý: "${tag}"`);
        }
      }
    });

    return result;
  }

  hideChoices() {
    const choicesContainer = document.getElementById("storyChoices");
    choicesContainer.style.display = "none";
    choicesContainer.innerHTML = "";
  }

  async typewriterEffect(text) {
    this.isTyping = true;
    this.currentText = text;
    const dialogueElement = document.getElementById("dialogueText");

    dialogueElement.innerHTML = "";
    let displayedText = "";

    for (let i = 0; i < text.length; i++) {
      if (!this.isTyping) break;
      displayedText += text[i];
      dialogueElement.innerHTML = this.formatText(displayedText);
      await new Promise((resolve) => setTimeout(resolve, this.typewriterSpeed));
    }

    this.isTyping = false;
    dialogueElement.innerHTML = this.formatText(this.currentText);
  }

  skipTyping() {
    this.isTyping = false;
    document.getElementById("dialogueText").innerHTML = this.formatText(
      this.currentText
    );
  }

  formatText(text) {
    return text.replace(/\n/g, "<br>");
  }

  handleStoryEnd() {
    const choices = this.storyManager.story.currentChoices;

    if (choices.length > 0) {
      this.showChoices(choices);
    } else {
      // Tự động hiện quiz như một lựa chọn
      this.showQuizAsChoice();
    }
  }

  showChoices(choices) {
    const choicesContainer = document.getElementById("storyChoices");

    choices.forEach((choice, index) => {
      const choiceBtn = document.createElement("button");
      choiceBtn.className = "choice-btn";
      choiceBtn.textContent = choice.text;
      choiceBtn.dataset.choice = index;

      choiceBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const choiceIndex = parseInt(e.target.dataset.choice);
        this.handleChoice(choiceIndex);
      });

      choicesContainer.appendChild(choiceBtn);
    });

    choicesContainer.style.display = "flex";
  }

  showQuizAsChoice() {
    const choicesContainer = document.getElementById("storyChoices");
    const choiceBtn = document.createElement("button");

    choiceBtn.className = "choice-btn quiz-choice";
    choiceBtn.textContent = "Kiểm tra kiến thức →";

    choiceBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.inQuizMode = true;
      this.showQuiz();
    });

    choicesContainer.appendChild(choiceBtn);
    choicesContainer.style.display = "flex";
  }

  handleChoice(choiceIndex) {
    this.hideChoices();
    this.storyManager.story.ChooseChoiceIndex(choiceIndex);
    this.showNextChunk();
  }

  showQuiz() {
    const quiz = this.quizzes.quizzes[this.currentChapter];
    if (!quiz) {
      alert("Câu hỏi cho chương này đang được cập nhật...");
      this.inQuizMode = false; // Reset trạng thái
      return;
    }

    this.hideChoices();
    this.showQuizChoices(quiz);
  }

  showQuizChoices(quiz) {
    const choicesContainer = document.getElementById("storyChoices");

    // Hiển thị câu hỏi trong dialogue
    document.getElementById(
      "dialogueText"
    ).innerHTML = `<strong>Câu hỏi:</strong><br>${quiz.question}`;

    // Hiển thị các lựa chọn đáp án
    quiz.options.forEach((option, index) => {
      const choiceBtn = document.createElement("button");
      choiceBtn.className = "choice-btn";
      choiceBtn.textContent = option;
      choiceBtn.dataset.answer = index;

      choiceBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const answerIndex = parseInt(e.target.dataset.answer);
        this.handleQuizAnswer(quiz, answerIndex);
      });

      choicesContainer.appendChild(choiceBtn);
    });

    choicesContainer.style.display = "flex";
  }

  handleQuizAnswer(quiz, answerIndex) {
    const choicesContainer = document.getElementById("storyChoices");
    const isCorrect = answerIndex === quiz.correctAnswer;

    // Hiển thị kết quả
    if (isCorrect) {
      document.getElementById(
        "dialogueText"
      ).innerHTML = `<strong>✅ Chính xác!</strong><br><br>${quiz.explanation}`;

      // Tạo container cho các nút
      const buttonContainer = document.createElement("div");
      buttonContainer.style.display = "flex";
      buttonContainer.style.gap = "10px";
      buttonContainer.style.flexDirection = "column";

      // Nút về Dashboard
      const dashboardBtn = document.createElement("button");
      dashboardBtn.className = "choice-btn";
      dashboardBtn.textContent = "🏠 Về Dashboard";
      dashboardBtn.addEventListener("click", () => {
        this.inQuizMode = false; // Tắt chế độ quiz
        this.unlockNextChapter();
      });

      // Nút chơi lại chương
      const replayBtn = document.createElement("button");
      replayBtn.className = "choice-btn";
      replayBtn.textContent = "🔄 Chơi lại chương này";
      replayBtn.addEventListener("click", () => {
        this.inQuizMode = false; // Tắt chế độ quiz
        this.startChapter(this.currentKnot, this.currentChapter);
      });

      buttonContainer.appendChild(dashboardBtn);
      buttonContainer.appendChild(replayBtn);

      choicesContainer.innerHTML = "";
      choicesContainer.appendChild(buttonContainer);
    } else {
      document.getElementById(
        "dialogueText"
      ).innerHTML = `<strong>❌ Sai rồi!</strong><br><br>${quiz.explanation}`;

      // Nút làm lại (reset state)
      const retryBtn = document.createElement("button");
      retryBtn.className = "choice-btn";
      retryBtn.textContent = "🔄 Làm lại";
      retryBtn.addEventListener("click", () => {
        // Reset về trạng thái ban đầu của quiz
        this.showQuiz();
      });

      choicesContainer.innerHTML = "";
      choicesContainer.appendChild(retryBtn);
    }
  }

  unlockNextChapter() {
    const nextChapter = parseInt(this.currentChapter) + 1;
    this.dashboard.unlockChapter(nextChapter);
    this.showView("dashboardView");
  }

  showView(viewName) {
    document.querySelectorAll(".view").forEach((view) => {
      view.classList.remove("active");
    });
    document.getElementById(viewName).classList.add("active");
  }
}

// Các class đơn giản hóa
class StoryManager {
  async loadStory(jsonPath) {
    try {
      const response = await fetch(jsonPath);
      const storyContent = await response.json();
      this.story = new inkjs.Story(storyContent);
      return true;
    } catch (error) {
      console.error("Error loading story:", error);
      return false;
    }
  }

  getVariable(name) {
    if (!this.story) return null;
    return this.story.variablesState.$(name);
  }

  setVariable(name, value) {
    if (!this.story) return;
    this.story.variablesState.$(name, value);
  }

  observeVariable(name, callback) {
    if (!this.story) {
      console.warn("Cannot observe variable - story not loaded");
      return;
    }
    this.story.ObserveVariable(name, callback);
  }
}

class CharacterManager {
  showCharacter(characterName) {
    const container = document.getElementById("characterContainer");
    container.innerHTML = "";

    const element = document.createElement("img");
    element.className = "character-sprite active";
    element.alt = characterName;
    element.src = this.getCharacterImagePath(characterName);

    container.appendChild(element);
  }

  getCharacterImagePath(characterName) {
    const characterMap = {
      vladimir: "assets/characters/vladimir-leader-aged.png",
      "mary-worker-tired": "assets/characters/mary-worker-tired.png",
      arthur: "assets/characters/arthur-young-innocent.png",
      "foreman-angry": "assets/characters/foreman-angry.png",
      "harrington-old-dignified":
        "assets/characters/harrington-old-dignified.png",
      "marx-teacher": "assets/characters/marx-teacher.png",
      "marx-approving": "assets/characters/marx-approving.png",
      "thomas-broken-defeated": "assets/characters/thomas-broken-defeated.png",
      "thomas-craftsman-proud": "assets/characters/thomas-craftsman-proud.png",
      "engels-concerned": "assets/characters/engels-concerned.png",
      "engels-serious": "assets/characters/engels-serious.png",
    };
    return characterMap[characterName] || "assets/characters/placeholder.png";
  }
}

class BackgroundManager {
  setBackground(backgroundName) {
    const container = document.getElementById("backgroundContainer");
    const imagePath = this.getBackgroundImagePath(backgroundName);

    container.style.opacity = "0";
    setTimeout(() => {
      container.style.backgroundImage = `url('${imagePath}')`;
      container.style.opacity = "1";
    }, 500);
  }

  getBackgroundImagePath(backgroundName) {
    const backgroundMap = {
      "london-alley-1848": "assets/backgrounds/london-alley-1848.jpeg",
      "factory-exterior-smoke":
        "assets/backgrounds/factory-exterior-smoke.jpeg",
      "factory-interior-dark": "assets/backgrounds/factory-interior-dark.jpeg",
      "library-return": "assets/backgrounds/library-return.jpeg",
      "pub-workers-dim": "assets/backgrounds/pub-workers-dim.jpeg",
      "london-quiet-corner": "assets/backgrounds/london-quiet-corner.png",
      "factory-office-exterior":
        "assets/backgrounds/factory-office-exterior.jpeg",
      "london-street-evening": "assets/backgrounds/london-street-evening.jpeg",
      "paris-battle-smoke": "assets/backgrounds/paris-battle-smoke.png",
      "harrington-office-grand":
        "assets/backgrounds/harrington-office-grand.jpeg",
      "revolution-fire-hope": "assets/backgrounds/revolution-fire-hope.png",
      "london-modern-industrial":
        "assets/backgrounds/london-modern-industrial.png",
    };
    return backgroundMap[backgroundName] || "assets/backgrounds/default.jpg";
  }
}

class Dashboard {
  constructor() {
    this.chapters = [
      {
        id: 1,
        knot: "Nha_May_Harrington",
        title: "Nhà Máy Harrington",
        description: "Bi kịch bắt đầu từ đây...",
        unlocked: true,
      },
      {
        id: 2,
        knot: "Thu_Vien_Tim_Kiem",
        title: "Thư Viện Tìm Kiếm",
        description: "Gặp gỡ một triết gia",
        unlocked: false,
      },
      {
        id: 3,
        knot: "Hanh_Dong_Bat_Dau",
        title: "Hành Động Bắt Đầu",
        description: "Tìm kiếm đồng minh",
        unlocked: false,
      },
      {
        id: 4,
        knot: "Ngay_Dinh_Menh",
        title: "Ngày Định Mệnh",
        description: "Cuộc đình công lịch sử",
        unlocked: false,
      },
      {
        id: 5,
        knot: "Bai_Hoc_Cuoi_Cung",
        title: "Bài Học Cuối Cùng",
        description: "Thất bại và trưởng thành",
        unlocked: false,
      },
      {
        id: 6,
        knot: "Thoi_Gian_Da_Diem",
        title: "Thời Gian Đã Điểm",
        description: "Chuẩn bị cho cách mạng",
        unlocked: false,
      },
      {
        id: 7,
        knot: "Noi_Day",
        title: "Nổi Dậy",
        description: "Cách mạng bùng nổ",
        unlocked: false,
      },
      {
        id: 8,
        knot: "Tuyen_Bo_Chien_Thang",
        title: "Tuyên Bố Chiến Thắng",
        description: "Thế giới mới bắt đầu",
        unlocked: false,
      },
      {
        id: 9,
        knot: "Thanh_Pho_Lai_Tap",
        title: "Thành Phố Lại Tập",
        description: "Những câu hỏi cuối cùng",
        unlocked: false,
      },
    ];

    this.init();
  }

  init() {
    this.renderChapters();
  }

  renderChapters() {
    const grid = document.getElementById("chaptersGrid");
    grid.innerHTML = this.chapters
      .map(
        (chapter) => `
          <div class="chapter-card ${chapter.unlocked ? "" : "locked"}" 
               data-chapter-id="${chapter.id}" data-knot="${chapter.knot}">
              <div class="chapter-number">Chương ${chapter.id}</div>
              <div class="chapter-title">${chapter.title}</div>
              <div class="chapter-desc">${chapter.description}</div>
              ${!chapter.unlocked ? '<div class="locked-overlay">🔒</div>' : ""}
          </div>
      `
      )
      .join("");

    grid.addEventListener("click", (e) => {
      const chapterCard = e.target.closest(".chapter-card");
      if (!chapterCard || chapterCard.classList.contains("locked")) return;

      const chapterId = chapterCard.dataset.chapterId;
      const knotName = chapterCard.dataset.knot;

      if (window.app) {
        window.app.startChapter(knotName, chapterId);
      }
    });
  }

  unlockChapter(chapterId) {
    const chapter = this.chapters.find((c) => c.id === parseInt(chapterId));
    if (chapter) {
      chapter.unlocked = true;
      this.renderChapters();
    }
  }
}

window.addEventListener("DOMContentLoaded", () => {
  window.app = new App();
});
