import React from "react";

const SimpleCard = ({ recipe, children }) => {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img
        className="card-img-top"
        src={recipe.photo}
        alt={recipe.name}
        style={{ height: "180px", objectFit: "cover" }}
      />
        {children}
    </div>

  );
};

export default SimpleCard;