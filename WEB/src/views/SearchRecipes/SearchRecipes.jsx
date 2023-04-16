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
  const [recipe, setRecipes] = useState("");
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setIngredients(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Buscando recetas para:", ingredients);

    searchRecipes(ingredients)
      .then((data) => {
        console.log(data.result);
        if (data && data.result) {
          setRecipes(data.result);
        } else {
          setError("Invalid response from API");
        }
      })
      .catch((err) => {
        console.log(err);
        setError("Error fetching data: " + error);
      });
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
      <div className="card h-100 p-2">
        <div className="card-body">
          <h5 className="card-title text-body">{recipe}</h5>
        </div>
      </div>
    </div>
  );
}

export default SearchRecipes;
