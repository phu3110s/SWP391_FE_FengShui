import React, { useEffect } from "react";
import { useState } from "react";
import paymentPlan from "../../../apis/advertising/paymentApi";
import { message, Table } from "antd";
import "./PaymentViewing.css"
export default function PaymentViewing() {
    const token = localStorage.getItem("token")
    const [loading, setLoading] = useState(false)
    const [payments, setPayments] = useState(false)
    const [page, setPage] = useState(1)
    const [size, setSize] = useState(10)
    const [total, setTotal] = useState(0)
    const fetchPaymentPlans = async () => {
        setLoading(true)
        try {
            const response = await paymentPlan.getPaymentPlan(page, size, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setPayments(response.data.items)
            setTotal(response.data.items.total)
        } catch (error) {
            if (error.response) {
                const { status } = error.response;
                if (status === 403) {
                    message.error("Bạn không có quyền thực hiện hành động này")
                } else {
                    message.error("Lỗi kết nối")
                }
            }
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchPaymentPlans();
    }, [])
    const column = [
        {
            title: "Tên gói",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "Giá thành(VND)",
            dataIndex: "amount",
            key: "amount"
        },
        {
            title: "Thông tin mô tả",
            dataIndex: "description",
            key: "description"
        },
        {
            title: "Số ngày hiệu lực",
            dataIndex: "expiredDay",
            key: "expiredDay"
        }
    ]
    return (
        <div>
            <h1>Danh sách các gói thanh toán</h1>
            <Table className="table" columns={column} dataSource={payments}
                pagination={{ current: page, pageSize: size, total: total, showSizeChanger: false, }}
            />
        </div>
    )
}