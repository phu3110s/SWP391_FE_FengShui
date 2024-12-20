import React, { useEffect, useState } from 'react'
import Header from '../../components/header/Header'
import Navigation from '../../components/navbar/Navigation'
import { Link, useParams } from 'react-router-dom';
import postingApi from '../../apis/advertising/postingApi';
import Footer from '../../components/footer/Footer';
import { Avatar } from 'antd';
import userApi from '../../apis/user/userApi';

export default function AdvertisingDetail() {


    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [advertisings, setAdvertisings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogDetail = async () => {
            setLoading(true);
            try {
                const response = await postingApi.getAdvertisingsById(id);
                if (response && response.data) {
                    setAdvertisings(response.data);
                    const userResponse = await userApi.getUserProfile(response.data.userId)
                    if (userResponse && userResponse.data) {
                        setUser(userResponse.data)
                    }
                } else {
                    throw new Error("No blog data found");
                }
            } catch (err) {
                setError(err.message || "Lỗi");
            } finally {
                setLoading(false);
            }
        };

        fetchBlogDetail();
    }, [id]);
    console.log(advertisings)

    if (loading) return <p>Loading...</p>;
    if (error) {
        if (error.includes("404")) {
            return <p>Blog not found (404)</p>;
        }
        return <p>Error: {error}</p>;
    }
    if (!advertisings) return <p>No blog found</p>;


    return (
        <>
            <Header />
            <div className="detail-container">

                <div className="short-detail-in4">
                    <div className='detail-img'>
                        <img src={advertisings.urlImg} alt={advertisings.title} />
                    </div>
                    <div className="product-detail-in4">
                        <h2 >{advertisings.title}</h2> <br />
                        <p>Ngày đăng: {new Date(advertisings.createAt).toLocaleString('vi-VN', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}</p><br />
                        <p>Giá: {advertisings.price ? advertisings.price.toLocaleString('vi-VN') : 'N/A'} VND</p><br />
                        <p>Loại bài đăng: {advertisings.itemTypeName}</p><br /> <br />
                        <Link to={`/user-profile/${user.id}`} className="customer-in4">
                            <img
                                src={user.urlImg}
                                alt={user.fullName}
                            />
                            <p className="user-block">Tác giả: {user.fullName}</p>
                        </Link> <br />
                        <h4>Mô tả chi tiết</h4> <br />
                        <p>{advertisings.description}</p>
                    </div>
                </div>

            </div>
            <Footer />
        </>
    )
}
