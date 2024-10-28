import React from 'react'
import './Policy.css'
import Header from '../components/header/Header'

export default function Policy() {
    return (
        <div className='policy'>
            <Header />
            <div className='policy-form'>
                <h2>Quy định về đăng tin tức</h2>
                <h4>1. Nội dung chính xác và minh bạch</h4>
                <p>
                    Thông tin đăng tải phải trung thực, rõ ràng, không gây hiểu lầm.<br />
                    Không được đăng tin giả, sai sự thật hoặc gây hoang mang dư luận.
                </p>

                <h4>2. Không vi phạm bản quyền</h4>
                <p>
                    Tôn trọng quyền sở hữu trí tuệ, không sao chép nội dung từ các nguồn khác mà không có sự cho phép.<br />
                    Đảm bảo hình ảnh, video và tài liệu đính kèm thuộc quyền sở hữu của bạn hoặc có giấy phép sử dụng.
                </p>

                <h4>3. Ngôn ngữ lịch sự và chuyên nghiệp</h4>
                <p>
                    Sử dụng ngôn ngữ thân thiện, không xúc phạm, kỳ thị hay phân biệt đối xử.<br />
                    Không sử dụng ngôn ngữ không phù hợp, gây khó chịu cho người đọc.
                </p>

                <h4>4. Không chứa nội dung cấm hoặc không phù hợp</h4>
                <p>
                    Tránh các nội dung nhạy cảm như bạo lực, khiêu dâm, kích động thù hận, hoặc bất kỳ nội dung trái pháp luật nào.<br />
                    Không chứa nội dung chính trị nhạy cảm hoặc vi phạm chuẩn mực xã hội.
                </p>

                <h4>5. Thông tin liên lạc rõ ràng và chính xác</h4>
                <p>
                    Cung cấp thông tin liên hệ đáng tin cậy để người đọc có thể liên lạc khi cần.<br />
                    Không đăng thông tin liên lạc sai lệch hoặc giả mạo.
                </p>

                <h4>6. Không đăng nhiều lần cùng một nội dung</h4>
                <p>
                    Tránh việc đăng lặp lại nội dung nhiều lần để tránh spam và làm phiền người đọc.<br />
                    Nếu cần cập nhật nội dung, hãy chỉnh sửa bài đăng cũ thay vì đăng mới.
                </p>

                <h4>7. Tiêu đề phù hợp và không gây hiểu nhầm</h4>
                <p>
                    Tiêu đề phải phản ánh đúng nội dung của bài đăng.<br />
                    Tránh tiêu đề giật gân, gây hiểu lầm hoặc chỉ nhằm thu hút người đọc.
                </p>

                <h4>8. Tuân thủ các quy định pháp luật hiện hành</h4>
                <p>
                    Mọi bài đăng cần tuân thủ đúng các quy định pháp luật liên quan đến lĩnh vực nội dung đang được đăng tải.<br />
                    Không cổ xúy, khuyến khích vi phạm pháp luật hoặc hoạt động trái pháp luật.
                </p>

                <h4>Các hành vi vi phạm có thể không được duyệt bài:</h4>
                <p>Vi phạm quyền sở hữu trí tuệ, sao chép từ nguồn khác mà không ghi rõ nguồn gốc.<br />
                    Sử dụng ngôn ngữ không phù hợp hoặc có tính xúc phạm.<br />
                    Đăng tải nội dung gây hiểu nhầm hoặc chứa thông tin sai lệch.<br />
                    Bài đăng chứa nội dung bị cấm theo quy định pháp luật.<br />
                    Bài đăng không đủ tiêu chuẩn về chất lượng, gây ảnh hưởng tiêu cực đến trải nghiệm người đọc.<br />
                    Việc tuân thủ các quy định trên giúp đảm bảo tính chuyên nghiệp và chất lượng cho nội dung đăng tải.</p>

                <h2>Gói đăng quảng cáo</h2>
                <h4>Có 3 gói đăng tin:</h4>
                <h4>1. Gói đăng trong vòng 7 ngày</h4>
                <p>a. Được đăng trong 7 ngày kể từ ngày bài viết được duyệt<br />
                    b. Giá đăng: 25.000VNĐ<br />
                    c. Sau 7 ngày bài viết sẽ không còn được quảng cáo nhưng bạn có thể gia hạn thêm thời gian.</p>

                <h4>2. Gói đăng trong vòng 3 ngày</h4>
                <p>a. Được đăng trong 3 ngày kể từ ngày bài viết được duyệt<br />
                    b. Giá đăng: 10.000VNĐ<br />
                    c. Sau 3 ngày bài viết sẽ không còn được quảng cáo nhưng bạn có thể gia hạn thêm thời gian.</p>

                <h4>3. Gói đăng trong vòng 30 ngày</h4>
                <p>a. Được đăng trong 30 ngày kể từ ngày bài viết được duyệt<br />
                    b. Giá đăng: 100.000VNĐ<br />
                    c. Sau 30 ngày bài viết sẽ không còn được quảng cáo nhưng bạn có thể gia hạn thêm thời gian.</p>

                <h4>Cách gia hạn bài đăng quản cáo:</h4>
                <p>
                    Vào trang đăng bài của bạn để chọn phần bài hết hạn.<br />
                    Bạn có thể chọn loại gói đăng bài khác.
                </p>
            </div>
        </div>
    )
}
