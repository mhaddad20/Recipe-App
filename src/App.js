import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchRecipes('italian wedding soup');
  }, []);

  const fetchRecipes = async (query) => {
    const options = {
      method: 'GET',
      url: 'https://recipe-by-api-ninjas.p.rapidapi.com/v1/recipe',
      params: { query: query },
      headers: {
        'x-rapidapi-key': 'a382e22ad3msh2f0df04d804dc4fp123f1bjsn740c0d9b024a',
        'x-rapidapi-host': 'recipe-by-api-ninjas.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      setRecipes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchRecipes(search);
  };

  return (
    <div className="App">
      <h1>Gourmet Recipe Finder</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for delicious recipes..."
        />
        <button type="submit">Search</button>
      </form>
      <div className="recipes">
        {recipes.map((recipe, index) => (
          <div key={index} className="recipe-card">
            <h2>{recipe.title}</h2>
            <h3>Ingredients:</h3>
            <p>{recipe.ingredients}</p>
            <h3>Instructions:</h3>
            <p>{recipe.instructions}</p>
            <p className="servings">Servings: {recipe.servings}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;