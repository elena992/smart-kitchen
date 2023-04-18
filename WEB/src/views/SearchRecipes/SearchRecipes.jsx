import React, { useState, useContext } from "react";
import axios from "axios";
import { searchRecipes } from "../../services/RecipeService";

/*const [data, setData] = useState([]);

useEffect(() => {
    axios.get('https://api.openai.com')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  

const SearchRecipes = () => {

    return (
        <div className="api-recipes" style={{ backgroundColor: 'purple' }}>
       <div className="container">
        <h1>Find the best recipe</h1>
        <p>Hello</p>
       </div>
      </div>

    )
} */

function SearchRecipes() {
  const [ingredients, setIngredients] = useState("");
  const [recipeName, setRecipeName] = useState("");
  const [recipeIngredients, setRecipeIngredients] = useState("");
  const [recipeInstructions, setRecipeInstructions] = useState("");
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setIngredients(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (ingredients === "") {
      setError("Please enter ingredients");
    } else {
      searchRecipes(ingredients)
        .then((data) => {
          let json = JSON.parse(data.result);

          if (data && data.result) {
            setRecipeName(json.name);
            setRecipeIngredients(json.ingredients);
            setRecipeInstructions(json.instructions);
            setIngredients("");
          } else {
            setError("Invalid response from API");
          }
        })
        .catch((err) => {
          console.log(err);
          setError("Error fetching data: " + error);
        });
    }
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <label>
          Type your ingredients to get your recipe
          <input type="text" value={ingredients} onChange={handleInputChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
      {error && <p className="error">{error}</p>}
      {recipeName && (
        <div className="card h-100 p-2">
          <div className="card-body">
            <h5 className="card-title text-body">{recipeName}</h5>
          </div>
        </div>
      )}
      {recipeIngredients && (
        <div className="card h-100 p-2">
          <div className="card-body">
            <h5 className="card-title text-body">{recipeIngredients}</h5>
          </div>
        </div>
      )}
      {recipeInstructions && (
        <div className="card h-100 p-2">
          <div className="card-body">
            <h5 className="card-title text-body">{recipeInstructions}</h5>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchRecipes;
