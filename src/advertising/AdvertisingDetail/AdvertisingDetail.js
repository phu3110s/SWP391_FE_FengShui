import React, { useEffect, useState } from 'react'
import Header from '../../components/header/Header'
import Navigation from '../../components/navbar/Navigation'
import { Link, useParams } from 'react-router-dom';
import postingApi from '../../apis/postingApi';
import Footer from '../../components/footer/Footer';
import { Avatar } from 'antd';

export default function AdvertisingDetail() {


    const { id } = useParams();
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
        <div className="detail-container">
            <Header />
            <Navigation />
            <div className="short-detail-in4">
                <div className='detail-img'>
                    <img src={advertisings.urlImg} alt={advertisings.title} />
                </div>
                <div className="product-detail-in4">
                    <h2>{advertisings.title}</h2> <br />
                    <p>Ngày đăng: {advertisings.createAt}</p> <br />
                    <p>Giá: {advertisings.price}</p>
                    <p>Loại bài đăng: {advertisings.itemTypeName}</p>

                    <h4>Mô tả chi tiết</h4> <br />
                    <p>{advertisings.description}</p>
                </div>
            </div>
            <Footer />
        </div>
    )
}
