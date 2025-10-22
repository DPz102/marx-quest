// ===== CHƯƠNG 1: NHÀ MÁY HARRINGTON =====
// Bi kịch khởi đầu

=== Nha_May_Harrington ===
# bg: london-alley-1848
# character: none
# speaker: Vladimir (Bạn)
Tôi đã từng tin vào luật pháp, vào lẽ phải, vào những con chữ trong sách vở. Tôi, Vladimir, một sinh viên triết học, tin rằng có thể dùng lý luận để cải tạo thế giới.
# speaker: Vladimir (Bạn)
Cho đến ngày hôm nay. Ngày thực tại xé nát trang sách của tôi.

# bg: factory-exterior-smoke
# speaker: Narrator
Một tiếng gõ cửa gấp gáp. Mary, cô gái nhà bên, mặt đẫm nước mắt.
# character: mary-worker-tired
# speaker: Mary
"Anh Vladimir! Anh phải đến nhà máy ngay! Là... là Arthur!"
--> Den_Nha_May

=== Den_Nha_May ===
# bg: factory-interior-dark
# character: none
# speaker: Narrator
Bạn lao đến nhà máy Harrington, con quái vật bằng gạch và khói than. Tiếng gầm rú của máy móc hôm nay nghe như một tiếng cười man rợ.
# speaker: Narrator
Một đám đông tụ tập ở góc xưởng dệt. Người quản đốc đang quát tháo, cố giải tán họ. Và rồi, bạn thấy cậu ấy.
# speaker: Narrator
Arthur. Em trai của bạn. Mười hai tuổi.
# speaker: Narrator
Thân thể nhỏ bé của cậu nằm bất động bên cạnh cỗ máy dệt khổng lồ, một vũng máu loang ra từ bên dưới. Cỗ máy vẫn đang chạy, sợi chỉ vẫn đang được kéo qua, nhuốm một màu đỏ thẫm.

# speaker: Vladimir (Bạn)
"KHÔNG! ARTHUR!!"

# speaker: Narrator
Bạn lao tới, cố gắng lay cậu dậy, nhưng đã quá muộn.
# character: mary-worker-tired
# speaker: Mary
(Thì thầm, run rẩy) "Họ bắt nó làm việc 14 tiếng. Cỗ máy bị kẹt, nhưng gã quản đốc không cho dừng lại. Hắn dọa sẽ trừ lương... Thằng bé... thằng bé cố gỡ sợi chỉ và..."

+ [Gào lên với gã quản đốc] -> Confront_Foreman
+ [Quay sang Mary: "Ai đã làm việc này?"] -> Ask_Mary_Who
+ [Im lặng, ôm lấy Arthur] -> Silent_Grief


=== Confront_Foreman ===
# character: foreman-angry
# speaker: Vladimir (Bạn)
"TẠI SAO CÁC NGƯƠI LẠI ĐỂ MỘT ĐỨA TRẺ LÀM VIỆC NÀY? ĐÂY LÀ TỘI ÁC!"
# speaker: Quản đốc
(Gã gầm gừ, không một chút hối lỗi) "Tai nạn lao động thôi. Nó bất cẩn. Nào, giải tán! Quay lại làm việc! Cỗ máy không thể dừng chỉ vì một thằng nhóc được."
-> Meet_Harrington


=== Ask_Mary_Who ===
# character: mary-worker-tired
# speaker: Vladimir (Bạn)
"Mary... nói cho tôi biết... ai đã ép nó?"
# speaker: Mary
(Cô lùi lại, sợ hãi) "Tôi... tôi không biết gì hết... Anh Vladimir, làm ơn... tôi còn phải nuôi con... Bọn họ sẽ đuổi tôi..."
# speaker: Narrator
Nỗi sợ hãi trong mắt cô còn lớn hơn cả sự đồng cảm. Bạn nhận ra, ở đây, mạng sống còn rẻ hơn một chỗ làm.
-> Meet_Harrington


=== Silent_Grief ===
# speaker: Narrator
Bạn ôm lấy thân thể lạnh ngắt của Arthur. Cơn giận dữ và nỗi đau bất lực cuộn lên trong lồng ngực. Bạn ngước nhìn cỗ máy, rồi nhìn những công nhân khác, họ liếc nhìn bạn vội vã rồi lại cúi đầu làm việc.
# speaker: Narrator
Họ sợ hãi. Họ bị cầm tù. Và em trai bạn là vật tế thần cho cỗ máy này.
-> Meet_Harrington


=== Meet_Harrington ===
# speaker: Narrator
Ngay lúc đó, tiếng ồn ào im bặt. Ngài Harrington bước ra từ văn phòng trên cao của ông ta. Lạnh lùng, quyền lực, bộ áo vest không một nếp nhăn.
# character: harrington-old-dignified
# speaker: Harrington
"Ta rất tiếc về sự cố đáng tiếc này. Một sự bất cẩn tai hại của cậu bé."
# speaker: Harrington
"Tất nhiên, tập đoàn Harrington sẽ hỗ trợ gia đình. Coi như... 2 shilling tiền mai táng. Giờ thì, đưa cậu bé đi đi. Chúng ta còn phải sản xuất."

# speaker: Vladimir (Bạn)
"2 shilling... cho một mạng người? Ông... Ông là một con quái vật!"

# speaker: Harrington
(Ông ta nhướng mày, giọng lạnh như băng) "Cậu Vladimir, cậu là người có học. Cậu nên hiểu. Đây là quy luật của tiến bộ. Sẽ luôn có những mất mát. Giờ thì, ra khỏi đây, hoặc ta sẽ gọi cảnh sát."
+ [Lao vào tấn công Harrington] -> Attack_Harrington
+ [Mang Arthur đi: "Tôi sẽ kiện ông!"] -> Vow_To_Sue


=== Attack_Harrington ===
# speaker: Narrator
Bạn lao tới trong cơn thịnh nộ, nhưng hai tên bảo vệ to lớn đã kẹp lấy bạn.
# character: harrington-old-dignified
# speaker: Harrington
"Sự dại dột của tuổi trẻ. Tống cậu ta ra ngoài. Và ghi tên vào sổ đen. Cậu ta sẽ không bao giờ kiếm được việc ở London này nữa."
# speaker: Narrator
Bạn bị ném ra con hẻm bẩn thỉu, ôm lấy thi thể em trai mình.
-> The_Failed_Lawsuit


=== Vow_To_Sue ===
# speaker: Vladimir (Bạn)
"Ông sẽ phải trả giá! Tôi sẽ đưa ông ra tòa! Cả thế giới sẽ biết tội ác của ông!"
# character: harrington-old-dignified
# speaker: Harrington
(Ông ta khẽ cười) "Tòa án? Tòa án của ai, cậu bé? Tòa án được xây bằng tiền của ai? Chúc may mắn."
# speaker: Narrator
Bạn ôm lấy thi thể Arthur, mang cậu ra khỏi địa ngục trần gian đó.
-> The_Failed_Lawsuit


=== The_Failed_Lawsuit ===
# bg: london-quiet-corner
# speaker: Narrator
Một tuần sau. Văn phòng luật sư.
# character: none
# speaker: Luật sư
(Gã luật sư già lắc đầu, lật giở đống giấy tờ) "Vô ích thôi, cậu Vladimir. Tôi đã cố."
# speaker: Vladimir (Bạn)
"Sao lại vô ích? Đó là lao động trẻ em! Điều kiện làm việc chết người!"
# speaker: Luật sư
"Nhưng không có nhân chứng. Mary? Cô ta đã bị sa thải và biến mất. Những công nhân khác? Không ai dám nói. Họ sợ."
# speaker: Luật sư
"Hơn nữa, Harrington đã 'quyên góp' một khoản lớn cho quỹ của tòa án ngay sáng nay. Thẩm phán sẽ không thụ lý vụ này đâu. Đây là London, cậu ạ. Công lý thuộc về kẻ trả tiền."

# speaker: Narrator
Gã luật sư đẩy 2 shilling mà Harrington đưa cho bạn qua bàn.
# speaker: Luật sư
"Lời khuyên của tôi là hãy cầm lấy số tiền này và quên chuyện đó đi. Cậu không thể chống lại Harrington. Cậu không thể chống lại cả hệ thống này."

# speaker: Narrator
Bạn bước ra khỏi văn phòng luật sư, 2 đồng shilling lạnh ngắt trong tay.
# speaker: Vladimir (Bạn)
(Tự nhủ) "Hệ thống... Nếu luật pháp không thể mang lại công lý... vậy thì luật pháp chính là một phần của tội ác."
# speaker: Vladimir (Bạn)
(Nghiến răng) "Nếu hệ thống này đã giết em trai ta... Ta phải hiểu nó. Và nếu cần... Ta sẽ phá hủy nó."

# speaker: Narrator
Bạn đi về phía thư viện lớn. Nỗi đau đã biến thành một mục đích lạnh lùng.
-> END