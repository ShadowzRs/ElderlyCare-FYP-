import React from "react";
import "./FeatureCard.css";

const SupportCard = ({ title, text, imageUrl }) => {
  return (
    <div className="card">
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-text">{text}</p>
      </div>

      <div className="card-image">
        <img src={imageUrl} alt={title} />
      </div>
    </div>
  );
};

export default SupportCard;
