import React, { useEffect, useState } from "react";
import { getRecipesByUser } from "../../services/RecipeService";
import SimpleCard from "../../components/SimpleCard/SimpleCard";

const MyRecipes = () => {
  const [recipe, setRecipes] = useState([]);

  useEffect(() => {
    getRecipesByUser()
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {recipe && (
        <div className="">
          <SimpleCard recipe={recipe}>
            <div className="d-flex justify-content-between">
              <button
                className="btn btn-primary"
                onClick={handleSave}
                disabled={!recipe}
              >
                Save
              </button>
            </div>
          </SimpleCard>
        </div>
      )}
    </div>
  );
};

export default MyRecipes;
