import React, { useState, useContext } from 'react';
import axios from 'axios';

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

/*
function SearchRecipes() {
  const [ingredients, setIngredients] = useState('');
  const [response, setResponse] = useState('');
  const [recipes, setRecipes] = useState([]);

  const handleInputChange = (event) => {
    setIngredients(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Buscando recetas para:', ingredients);
  };

  return (
    <div className= "container">
      <form onSubmit={handleSubmit}>
        <label>
          Type your ingredients to get your recipe
          <input type="text" value={ingredients} onChange={handleInputChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
      {response && <p>{response}</p>}
    </div>
  );
}
*/
function SearchRecipes() {
    const [ingredients, setIngredients] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState(null);
  
    const handleInputChange = (event) => {
      setIngredients(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log('Buscando recetas para:', ingredients);
     
      fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({ ingredients: ingredients })
      })
      .then(response => response.json())
      .then(data => {
        if (data && data.recipes) {
          setRecipes(data.recipes);
        } else {
          setError('Invalid response from API');
        }
      })
      .catch(error => {
        setError('Error fetching data: ' + error);
      });
    };
  
    return (
      <div className="container">
        <form onSubmit={handleSubmit}>
          <label>
            Type your ingredients to get your recipe
            <input type="text" value={ingredients} onChange={handleInputChange} />
          </label>
          <button type="submit">Submit</button>
        </form>
        {error && <p className="error">{error}</p>}
        <div className="recipe-cards">
          {recipes.map(recipe => (
            <div key={recipe.id} className="recipe-card">
              <h2>{recipe.title}</h2>
              <img src={recipe.image} alt={recipe.title} />
              <ul>
                {recipe.ingredients.map(ingredient => (
                  <li key={ingredient}>{ingredient}</li>
                ))}
              </ul>
              <p>{recipe.instructions}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default SearchRecipes;

