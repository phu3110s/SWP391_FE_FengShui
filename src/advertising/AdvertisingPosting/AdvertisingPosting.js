import React, { useEffect, useRef, useState } from 'react'
import './AdvertisingPosting.css'
import Header from '../../components/header/Header'
import Navigation from '../../components/navbar/Navigation'
import { Button, Input, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import postingApi from '../../apis/postingApi'
import axios from 'axios'
import { toast } from 'react-toastify'
import createPaymentLink from '../../apis/payosApi'
import CircularProgress from '@mui/material/CircularProgress';

export default function AdvertisingPosting() {

    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const [title, setTitle] = useState("");
    const [description, setDesription] = useState("");
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const productNameRef = useRef("");
    const descriptionRef = useRef("");
    const priceRef = useRef(1000);
    const RETURN_URL = `${window.location.href}result/`;
    const CANCEL_URL = `${window.location.href}result/`;
    // const [redirectLoading, setRedirectLoading] = useState(false);
    const [openDialogLoading, setOpenDialogLoading] = useState(false);
    useEffect(
        () => {
            if (!token) {
                alert(
                    "Bạn phải đăng nhập mới được đăng post. Chuyển hướng sang trang login"
                );
                navigate("/Login");
            }
        },
        [token],
        navigate
    );

    const handleImageInput = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    const handleSubmitPost = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append("userId", userId);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("image", image);
        try {
            const response = await postingApi.uploadBlog(formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 201) {
                message.success("Đăng blog thành công. Chờ duyệt");
                setTitle("");
                setDesription("");
                setImage("");
            } else if (response.status === 401) {
                alert(
                    "Lỗi. Không thể đăng bài. Hết phiên đăng nhập vui lòng đăng nhập lại"
                );
            } else {
                alert("Lỗi gì bất định");
            }
        } catch (error) {
            message.error(error.message || "Có lỗi xảy ra khi đăng blog");
        } finally {
            setLoading(false);
        }
    };

    const createPaymentLinkHandle = async function (
        callbackFunction,
        setLoading
    ) {
        setLoading(true);
        try {
            const body = JSON.stringify({
                description: descriptionRef.current.value,
                productName: productNameRef.current.value,
                price: Number(priceRef.current.value),
                returnUrl: RETURN_URL,
                cancelUrl: CANCEL_URL,
            });
            let response = await createPaymentLink.postPaymentPlan(body);
            if (response.error !== 0) throw new Error("Call Api failed: ");
            callbackFunction(response.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error("Có lỗi xảy ra");
        }
    };

    // const redirectPaymentLink = async function (checkoutResponse) {
    //     if (checkoutResponse) {
    //         let url = checkoutResponse.checkoutUrl;
    //         if (checkoutResponse.checkoutUrl.startsWith("https://dev.pay.payos.vn")) {
    //             url = checkoutResponse.checkoutUrl.replace(
    //                 "https://dev.pay.payos.vn",
    //                 "https://next.dev.pay.payos.vn"
    //             );
    //         }

    //         if (checkoutResponse.checkoutUrl.startsWith("https://pay.payos.vn")) {
    //             url = checkoutResponse.checkoutUrl.replace(
    //                 "https://pay.payos.vn",
    //                 "https://next.pay.payos.vn"
    //             );
    //         }
    //         window.location.href = url;
    //     }
    // };

    const openPaymentDialog = async function (checkoutResponse) {
        if (checkoutResponse) {
            let url = checkoutResponse.checkoutUrl;
            if (checkoutResponse.checkoutUrl.startsWith("https://dev.pay.payos.vn")) {
                url = checkoutResponse.checkoutUrl.replace(
                    "https://dev.pay.payos.vn",
                    "https://next.dev.pay.payos.vn"
                );
            }
            if (checkoutResponse.checkoutUrl.startsWith("https://pay.payos.vn")) {
                url = checkoutResponse.checkoutUrl.replace(
                    "https://pay.payos.vn",
                    "https://next.pay.payos.vn"
                );
            }
            // console.log(url);
            let { open } = window.PayOSCheckout.usePayOS({
                RETURN_URL: RETURN_URL,
                ELEMENT_ID: "config_root",
                CHECKOUT_URL: url,
                onExit: (eventData) => {
                    console.log(eventData);
                },
                onSuccess: (eventData) => {
                    console.log(eventData);
                    window.location.href = `${RETURN_URL}?orderCode=${eventData.orderCode}`;
                },
                onCancel: (eventData) => {
                    console.log(eventData);
                    window.location.href = `${CANCEL_URL}?orderCode=${eventData.orderCode}`;
                },
            });
            open();
        }
    };

    return (
        <div className="posting-blog">
            <Header />
            <Navigation />
            <div className="bl-pt-form">
                <h1>Product Posting Page</h1>
                <h3>Creating a Advertising</h3>
                <form onSubmit={handleSubmitPost}>
                    <div className="posting-blog-title">
                        <label>Title</label>
                        <Input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter blog title"
                            required
                        />
                    </div>
                    <div className="posting-blog-description">
                        <label>Description</label>
                        <Input.TextArea
                            type="text"
                            value={description}
                            onChange={(e) => setDesription(e.target.value)}
                            placeholder="Enter your blog description"
                            required
                        />
                    </div>
                    <div className="posting-blog-inputImage">
                        <label>Upload Image</label><br />
                        Share photos or a video<br />
                        <input type="file" onChange={handleImageInput} accept="image/*" />
                    </div>
                    <div>
                        {/* <Button
                            variant="contained"
                            onClick={() =>
                                createPaymentLinkHandle(redirectPaymentLink, setRedirectLoading)
                            }
                            disabled={redirectLoading}
                            className="!bg-[#5D5FEF] !normal-case"
                        >
                            Posting Product
                            {redirectLoading ? (
                                <>
                                    {" "}
                                    &nbsp; <CircularProgress className="!text-white" size={20} />
                                </>
                            ) : (
                                ""
                            )}
                        </Button> */}

                        <Button
                            variant="contained"
                            onClick={() =>
                                createPaymentLinkHandle(openPaymentDialog, setOpenDialogLoading)
                            }
                            disabled={openDialogLoading}
                            className="!bg-[#5D5FEF] !normal-case"
                        >
                            Mở Dialog thanh toán
                            {openDialogLoading ? (
                                <>
                                    {" "}
                                    &nbsp; <CircularProgress className="!text-white" size={20} />
                                </>
                            ) : (
                                ""
                            )}
                        </Button>

                    </div>
                </form>
            </div>
        </div>
    )
}
