import { Spin } from "antd";
import React from "react";
import "./loading.css";
export default function loadingSpinwheel() {
  return (
    <div>
      <Spin size="big" className="custom-spin" style={{ marginRight: 8 }} />
    </div>
  );
}
