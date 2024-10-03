import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [pokemon, setPokemon] = useState(null);
  const [pokemonId, setPokemonId] = useState(1);

  // Function to fetch Pokemon data
  const fetchPokemonData = async (id) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();
      setPokemon(data);
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
    }
  };

  // Fetch data when component mounts and when the pokemonId changes
  useEffect(() => {
    fetchPokemonData(pokemonId);
  }, [pokemonId]);

  // Increment/Decrement ID
  const handleNext = () => setPokemonId((prevId) => prevId + 1);
  const handlePrev = () => setPokemonId((prevId) => (prevId > 1 ? prevId - 1 : 1));

  return (
    <div className="pokedex">
      <h1>Pokédex</h1>
      {pokemon && (
        <div className="pokemon-stats">
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <h2>{pokemon.name}</h2>
          <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight}</p>
          <div>
            <h3>Types:</h3>
            <ul>
              {pokemon.types.map((type) => (
                <li key={type.type.name}>{type.type.name}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="controls">
        <button onClick={handlePrev} disabled={pokemonId === 1}>
          Previous
        </button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default App;
