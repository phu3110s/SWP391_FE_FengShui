import { Button, Input, message, Spin } from "antd";
import React, { useState } from "react";
import paymentPlan from "../../../apis/paymentApi";
import "./PaymentCreating.css"
export default function PaymentCreating() {
    const token = localStorage.getItem("token");
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState("");
    const [expiredDate, setExpiredDate] = useState(0);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const planInfo = {
            name: name,
            amount: amount,
            description: description,
            expiredDay: expiredDate
        };
        console.log(planInfo)
        try {
            const response = await paymentPlan.createPaymentPlan(planInfo, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("Yêu cầu thực hiện thành công", response);
            message.success("Tạo gói thành công!");
        } catch (error) {
            if (error.response) {
                message.error("Không thể thực hiện yêu cầu");
            } else {
                message.error("Lỗi kết nối");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="payment-container">
            <h2>Tạo các gói đăng bán</h2>
            <div className="payment-creating-container">
                <form>
                    <div className="gen-name-text">
                        <label>Tên của gói đăng ký</label>
                        <Input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="gen-name-text">
                        <label>Giá của gói đăng kí (VND)</label>
                        <Input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            required
                        />
                    </div>
                    <div className="gen-name-text">
                        <label>Thông tin mô tả của các gói đăng kí</label>
                        <Input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className="gen-name-text">
                        <label>Số ngày hiệu lực</label>
                        <Input
                            type="number"
                            value={expiredDate}
                            onChange={(e) => setExpiredDate(Number(e.target.value))}
                            required
                        />
                    </div>
                    <div>
                        <Button className="submit-button" type="submit" onClick={handleSubmit} disabled={loading}>
                            {loading ? <Spin /> : "Tạo gói"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
