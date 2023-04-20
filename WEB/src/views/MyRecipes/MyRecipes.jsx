import React, { useEffect, useState } from "react";
import { getRecipesByCurrentUser } from "../../services/RecipeService";
import SimpleCard from "../../components/SimpleCard/SimpleCard";

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getRecipesByCurrentUser()
      .then((response) => {
        setRecipes(response);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : recipes && recipes.length > 0 ? (
        recipes.map((recipe) => (
          <div key={recipe._id} className="">
            <SimpleCard recipe={recipe}>
              <div className="d-flex justify-content-between">
                <button className="btn btn-primary">Detail</button>
              </div>
            </SimpleCard>
          </div>
        ))
      ) : (
        <p>No recipes found</p>
      )}
    </div>
  );
};

export default MyRecipes;
