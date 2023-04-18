import React from "react";

const RecipeCard = ({ name, photo, ingredients, instructions }) => {
  return (
    <div className="card" style={{ width: "100%" }}>
      {photo && <img src={photo} className="card-img-top" alt={name} />}
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <p className="card-text">{instructions}</p>
      </div>
    </div>
  );
};

export default RecipeCard;