import axios from "axios";
import React, { useEffect, useState } from "react";
export default function HarmonyViewing() {
  const token = localStorage.getItem("token");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [fishOptions, setFishOptions] = useState([]);
  const [pondOptions, setPondOptions] = useState([]);
  const [harmonies, setHarmonies] = useState([]);
  const [selectedFish, setSelectedFish] = useState("");
  const [selectedPond, setSelectedPond] = useState("");
 // Harmony hoạt động như này:
 //Đầu tiên vô thì nó sẽ render hết tất cả các combo cá với hồ đã từng nhập 
 //xong r 2 ô select thì giống dạng filter hơn , dưới 2 ô là 1 button để tìm đúng cái độ hòa hợp
  useEffect(() => {
    fetchAllHarmonies();
  }, []);

  const fetchAllHarmonies = async () => {
    try {
      const response = await axios.get("API_ENDPOINT_TO_GET_ALL_HARMONIES");
      setHarmonies(response.data.items);
    } catch (error) {
      console.error("Error fetching harmonies:", error);
    }
  };

  const fetchHarmonyByFishAndPond = async () => {
    try {
    } catch (error) {
      console.error("Error fetching harmonies by fish and pond:", error);
    }
  };

  // Render toàn bộ tổ hợp cá và hồ
  const renderHarmonies = () => {
    return harmonies.map((harmony) => (
      <div key={harmony.id}>
        <p>
          <strong>Fish ID:</strong> {harmony.fishId}
        </p>
        <p>
          <strong>Pond ID:</strong> {harmony.pondId}
        </p>
        <p>
          <strong>Point:</strong> {harmony.point}
        </p>
        <p>
          <strong>Description:</strong> {harmony.description}
        </p>
      </div>
    ));
  };

  // Hàm submit khi admin chọn cá và hồ
  const handleSearch = () => {
    fetchHarmonyByFishAndPond();
  };

  return (
    <div>
      <h1>Harmony Admin Page</h1>

      {/* Dropdown để chọn cá */}
      <select
        value={selectedFish}
        onChange={(e) => setSelectedFish(e.target.value)}
      >
        <option value="">Select Fish</option>
        {fishOptions.map((fish) => (
          <option key={fish.id} value={fish.id}>
            {fish.name}
          </option>
        ))}
      </select>

      {/* Dropdown để chọn hồ */}
      <select
        value={selectedPond}
        onChange={(e) => setSelectedPond(e.target.value)}
      >
        <option value="">Select Pond</option>
        {pondOptions.map((pond) => (
          <option key={pond.id} value={pond.id}>
            {pond.name}
          </option>
        ))}
      </select>

      {/* Button để tìm kiếm */}
      <button onClick={handleSearch}>Search Harmony</button>

      
      <div>{renderHarmonies()}</div>
    </div>
  );
}
