import React, { useEffect, useState } from "react";
import fishApi from "../../apis/fishApi";
import { message, Spin } from "antd";
import "./FishDetail.css"
const FishDetail =({fishId}) =>{
    const [fish,setFish] = useState(null)
    const [loading,setLoading] = useState(false)
    useEffect(()=>{
        const fetchFishDetail = async() =>{
            setLoading(true)
            try{
                const response = await fishApi.getFishById(fishId);
                setFish(response.data)  
                console.log(response.data)
            }catch(error){
                if(error.response){
                    const {status} = error.response;
                    if(status === 400){
                        message.warning("yêu cầu này không thể thực hiện")
                    }else if(status === 401) {
                        message.warning("Phiên đăng nhập hết hạn")
                    }else{
                        message.error("Lỗi kết nối")
                    }
                }
            }finally{
                setLoading(false)
            }
        }
        if(fishId){
            fetchFishDetail();
        }
    },[fishId])
    if(loading){
        return <div>Loading....</div>
    }
    if(!fish){
        return<div>không tìm thấy dữ liệu cá này</div>
    }
    return(
        <div className="fish-detail">
            <p>{fish.name}</p>
            <p>{fish.color}</p>
            <p>{fish.size}</p>
            <p>{fish.description}</p>
            <img src={fish.urlImg}></img>
        </div>
    )
}
export default FishDetail;