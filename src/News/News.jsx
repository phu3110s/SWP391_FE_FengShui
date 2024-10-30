import React, { useState } from "react";
import './News.css';
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

function News() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="news-container">
      <Header />
      <div className="tabs">
        <div
          className={`tab-item ${activeTab === 0 ? "active" : ""}`}
          onClick={() => handleTabClick(0)}
        >
          Tin 1
        </div>
        <div
          className={`tab-item ${activeTab === 1 ? "active" : ""}`}
          onClick={() => handleTabClick(1)}
        >
          Tin 2
        </div>
        <div
          className={`tab-item ${activeTab === 2 ? "active" : ""}`}
          onClick={() => handleTabClick(2)}
        >
          Tin 3
        </div>
        <div
          className={`tab-item ${activeTab === 3 ? "active" : ""}`}
          onClick={() => handleTabClick(3)}
        >
          Tin 4
        </div>
        <div className="line"></div>
      </div>

      <div className="tab-content">
        <div className={`tab-pane ${activeTab === 0 ? "active" : ""}`}>
          <h2>Các Loại Cá Koi Phổ Biến và Đặc Điểm Nổi Bật</h2>
          <h4>Khám Phá Các Loại Cá Koi Được Ưa Chuộng Nhất Hiện Nay</h4>
          <p>Cá Koi không chỉ thu hút bởi vẻ đẹp rực rỡ mà còn bởi sự đa dạng về chủng loại, mỗi loại có màu sắc, hoa văn và đặc điểm riêng biệt. Dưới đây là một số loại cá Koi phổ biến và nổi bật trong các ao cá cảnh hiện nay:<br />
            1. Kohaku: Đây là loại cá Koi nổi tiếng nhất với màu sắc trắng và đỏ. Kohaku có màu nền trắng tinh khiết, điểm thêm các mảng màu đỏ, được xem là biểu tượng của sự tinh khiết và thịnh vượng.<br />
            2. Taisho Sanke: Loại cá Koi này là sự kết hợp của ba màu: trắng, đỏ và đen. Ra đời vào đầu thế kỷ 20, Taisho Sanke còn được gọi là “Sanke,” thường được xem là một trong ba loại cá Koi cổ điển, tượng trưng cho sự hòa hợp và cân bằng.<br />
            3. Showa Sanshoku: Tương tự như Taisho Sanke, nhưng Showa Sanshoku có nền màu đen với các mảng màu trắng và đỏ. Loại cá này được ưa chuộng nhờ vẻ ngoài ấn tượng và độc đáo, thường mang ý nghĩa của sự bền vững và khả năng vượt qua thử thách.<br />
            4. Asagi: Đây là loại cá Koi cổ điển với màu nền xanh lơ đặc trưng, có hoa văn dạng lưới trên lưng. Asagi đại diện cho sự điềm tĩnh và trí tuệ, được yêu thích bởi vẻ đẹp thanh thoát và tao nhã.<br />
            5. Tancho: Tancho có đặc điểm nổi bật là một đốm đỏ tròn trên đầu, tượng trưng cho mặt trời mọc của Nhật Bản. Loại cá này rất quý hiếm và được coi là may mắn, mang đến nhiều điều tốt lành cho gia chủ.<br />
            6. Utsuri: Utsuri bao gồm các loại như Hi Utsuri (đỏ đen), Ki Utsuri (vàng đen), và Shiro Utsuri (trắng đen). Loại cá này thường có các mảng màu tương phản rõ nét, tạo nên vẻ đẹp huyền bí và cuốn hút.<br />
            Mỗi loại cá Koi không chỉ khác nhau về màu sắc mà còn mang những ý nghĩa văn hóa và phong thủy khác nhau. Khi nuôi cá Koi, việc chọn loại cá phù hợp không chỉ giúp tăng giá trị thẩm mỹ mà còn mang đến năng lượng tích cực và tài lộc cho không gian sống.

          </p>

        </div>
        <div className={`tab-pane ${activeTab === 1 ? "active" : ""}`}>
          <h2>Lịch sử và Ý nghĩa của Cá Koi</h2>
          <h4>Cá Koi: Biểu tượng của sự trường thọ và may mắn</h4>
          <p>Cá Koi có nguồn gốc từ Nhật Bản, được nuôi dưỡng từ những năm 1600.
            Chúng được phát triển từ cá chép, ban đầu được nuôi để làm thực phẩm.
            Tuy nhiên, với sự phát triển của nghệ thuật và văn hóa, cá Koi đã trở thành một biểu tượng của sự trường thọ,
            may mắn và thành công trong văn hóa Nhật Bản.
            Cá Koi thường được nuôi trong các ao cá và được xem là biểu tượng của sự kiên trì và sức mạnh,
            với truyền thuyết nổi tiếng về một con cá Koi vượt thác để trở thành rồng. Hình ảnh cá Koi thường xuất hiện trong nghệ thuật,
            trang trí và các buổi lễ, đặc biệt là trong lễ hội trẻ em ở Nhật Bản, khi cá Koi được coi là biểu tượng của sức khỏe và hạnh phúc.
          </p>
        </div>
        <div className={`tab-pane ${activeTab === 2 ? "active" : ""}`}>
          <h2>Kỹ Thuật Nuôi Cá Koi</h2>
          <h4>Hướng dẫn nuôi cá Koi cho người mới bắt đầu</h4>
          <p>Nuôi cá Koi không chỉ là một sở thích mà còn là nghệ thuật. Để nuôi cá Koi khỏe mạnh và đẹp, cần chú ý đến một số yếu tố quan trọng:

            Chọn giống cá Koi: Nên chọn giống cá từ những nguồn uy tín, đảm bảo chất lượng. Các loại cá Koi khác nhau có màu sắc, hình dáng và kích thước khác nhau.

            Ao nuôi: Ao cá cần có kích thước phù hợp, độ sâu tối thiểu là 1 mét để cá có không gian bơi lội. Nên sử dụng hệ thống lọc nước và bơm oxy để duy trì môi trường sống sạch sẽ cho cá.

            Chế độ ăn: Cá Koi cần được cho ăn thực phẩm đặc biệt dành riêng cho cá Koi, với tần suất 2-3 lần mỗi ngày. Nên tránh cho cá ăn quá nhiều để không làm ô nhiễm nước.

            Chăm sóc sức khỏe: Theo dõi sức khỏe của cá thường xuyên và kiểm tra nước định kỳ để đảm bảo môi trường sống lý tưởng cho chúng.</p>
        </div>
        <div className={`tab-pane ${activeTab === 3 ? "active" : ""}`}>
          <h2>Văn Hóa Cá Koi trong Nghệ Thuật và Thiết Kế</h2>
          <h4>Cá Koi trong nghệ thuật và thiết kế: Sự kết hợp giữa truyền thống và hiện đại</h4>
          <p>Cá Koi không chỉ là loài cá cảnh mà còn là một phần quan trọng trong nghệ thuật và thiết kế. Trong nhiều tác phẩm nghệ thuật, cá Koi thường được thể hiện với màu sắc rực rỡ và hình dáng đẹp mắt, mang lại sự hài hòa và ý nghĩa sâu sắc.

            Nhiều nghệ sĩ hiện đại đã đưa hình ảnh cá Koi vào các tác phẩm tranh, điêu khắc và trang trí nội thất. Cá Koi thường được sử dụng trong thiết kế sân vườn, tạo ra không gian thư giãn và hòa mình với thiên nhiên. Hình ảnh cá Koi cũng thường thấy trong các sản phẩm thủ công, từ gốm sứ đến vải, mang lại sự độc đáo và cá tính cho từng sản phẩm.

            Cá Koi không chỉ là biểu tượng của văn hóa Nhật Bản mà còn là nguồn cảm hứng cho nhiều nghệ sĩ và nhà thiết kế trên khắp thế giới, thể hiện sự giao thoa giữa truyền thống và hiện đại trong nghệ thuật.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default News;
