import React, { useEffect, useState } from "react";
import { message, Spin } from "antd";
import "./pondDetail.css"
import pondApi from "../../apis/admin/pondApi";
const PondDetail = ({ pondId }) => {
    const [pond, setpond] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchpondDetail = async () => {
            setLoading(true)
            try {
                const response = await pondApi.getPondById(pondId);
                setpond(response.data)
            } catch (error) {
                if (error.response) {
                    const { status } = error.response;
                    if (status === 400) {
                        message.warning("yêu cầu này không thể thực hiện")
                    } else if (status === 401) {
                        message.warning("Phiên đăng nhập hết hạn")
                    } else {
                        message.error("Lỗi kết nối")
                    }
                }
            } finally {
                setLoading(false)
            }
        }
        if (pondId) {
            fetchpondDetail();
        }
    }, [pondId])
    if (loading) {
        return <Spin size="large" />

    }
    if (!pond) {
        return <div> Dữ liệu về hồ này đã không còn </div>
    }
    return (
        <div className="pond-detail">

            <h4>Chất liệu: {pond.material}</h4>
            <p>Hình dáng: {pond.shape}</p>
            <p>Mực nước: {pond.waterLevel}</p>
            <p>{pond.description}</p>

            <img src={pond.urlImg}></img>

        </div>
    )
}
export default PondDetail;