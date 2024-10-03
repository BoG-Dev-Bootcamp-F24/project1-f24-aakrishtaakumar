// src/App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';




function App() {
  const [pokemon, setPokemon] = useState(null); 
  const [pokemonId, setPokemonId] = useState(1); 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        const data = await response.json();
        setPokemon(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchPokemonData();
  }, [pokemonId]);

  const handleNext = () => setPokemonId(pokemonId + 1);
  const handlePrevious = () => {
    if (pokemonId > 1) setPokemonId(pokemonId - 1);
  };

  return (
    <div className="app-container">
      <h1>Pokédex</h1>
      <div className="content">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="pokemon-card">
            <div className="pokemon-image">
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            </div>
            <div className="pokemon-details">
              <h2>{pokemon.name}</h2>
              <p>Height: {pokemon.height / 10} m</p>
              <p>Weight: {pokemon.weight / 10} kg</p>
              <p>Base Experience: {pokemon.base_experience}</p>
              <div className="types">
                {pokemon.types.map((type) => (
                  <span key={type.type.name} className="type">
                    {type.type.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="navigation">
              <button onClick={handlePrevious} disabled={pokemonId === 1}>
                Previous
              </button>
              <button onClick={handleNext}>Next</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
