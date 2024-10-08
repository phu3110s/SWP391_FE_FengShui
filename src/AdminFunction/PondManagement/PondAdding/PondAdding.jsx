import { Descriptions } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function PondAdding() {
    const token = localStorage.getItem("token")
    const [Material,setMaterial] =useState("")
    const [Shape,setShape] = useState("")
    const [waterLevel,setWaterLevel] = useState("")
    const [description,setDesription] = useState("")
    const [image,setImage] = useState(null)
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()
    const handleCreateForm = async(e) =>{
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append("Material",Material);
        formData.append("Shape",Shape);
        formData.append("WaterLevel",waterLevel)
        formData.append("Description",Descriptions)
        formData.append("image",image);
        try{
            const response = await 
        }
    }
  return <div>Pond Adding Page</div>;
}
