import React, { useEffect, useState } from 'react'
import Header from '../../components/header/Header'
import Navigation from '../../components/navbar/Navigation'
import { Link, useParams } from 'react-router-dom';
import postingApi from '../../apis/postingApi';
import Footer from '../../components/footer/Footer';

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
                    <img src={advertisings.urlImg} alt={advertisings.itemTypeName} />
                </div>
                <div className="product-detail-in4">
                    <h2>{advertisings.itemTypeName}</h2> <br />
                    <p>Created at: {advertisings.createAt}</p> <br />
                    <Link to='/user-profile' className="customer-in4">
                        {advertisings.userInfo && (
                            <>
                                <img
                                    src={advertisings.userInfo.profileImageUrl || "default-avatar.png"}
                                    alt={advertisings.userInfo.fullName || "Unknown Author"}
                                />
                                <p>Author: {advertisings.userInfo.fullName}</p>
                            </>
                        )}
                    </Link> <br />
                    <h4>Mô tả chi tiết</h4> <br />
                    <p>{advertisings.description}</p>
                </div>
            </div>
            <Footer />
        </div>
    )
}
