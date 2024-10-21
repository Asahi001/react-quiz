import React from "react";
import "./loader.css";
export default function Loader() {
  return (
    <div className="loader_container">
      <div className="loader"></div>
      <div className="loading_text">Loading ...</div>
    </div>
  );
}
