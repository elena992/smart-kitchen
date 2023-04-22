import React from "react";
import "./SimpleCard.css";

/*
const SimpleCard = ({ recipe, children }) => {
  //console.log(recipe.photo);
  return (
    <div className="card-simple" style={{ width: "18rem" }}>
      <img
        className="card-simple-img-top"
        src={recipe.photo}
        alt={recipe.name}
        style={{ height: "180px", objectFit: "cover" }}
      />
      {children}
    </div>
  );
};
*/

const SimpleCard = ({ recipe, children, linkTo }) => {
  return (
    <a href={linkTo} className="card-link">
      <div className="card-simple">
        <img
          className="card-simple-img-top"
          src={recipe.photo}
          alt={recipe.name}
        />
        <div className="card-simple-name">{recipe.name}</div>
        {children}
      </div>
    </a>
  );
};
export default SimpleCard;
