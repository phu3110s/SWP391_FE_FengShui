import React from "react";
import "./FishList.css"
const FishList = ({ list }) => {
  return (
    <div className="fish-list">
      {list.map((item) => (
        <div key={item.id} className="fish-item">
          <h2>ID: {item.id}</h2>
          <p>Description: {item.description}</p>

          <div className="fishes-section">
            <h3>Fishes</h3>
            {item.fishes.map((fish) => (
              <div key={fish.id} className="fish-card">
                <img src={fish.urlImg} alt={fish.description} className="fish-image" />
                <div className="fish-details">
                  <p>Name: {fish.name}</p>
                  <p>Color: {fish.color}</p>
                  <p>Size: {fish.size}</p>
                  <p>Description: {fish.description}</p>
                </div>
              </div>
            ))}
          </div>

          <hr />
        </div>
      ))}
    </div>
  );
};

export default FishList;
