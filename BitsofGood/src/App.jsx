import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [pokemon, setPokemon] = useState(null);
  const [pokemonId, setPokemonId] = useState(1);
  const [showMoves, setShowMoves] = useState(false); // For toggling between info and moves

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

  // Toggle between info and moves
  const toggleMoves = () => setShowMoves(!showMoves);

  return (
    <div className="pokedex">
      <h1>Bits of Good Mid-Semester Project</h1>
      
      {pokemon && (
        <div className="pokemon-info">
          <div className="pokemon-image">
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <h2>{pokemon.name}</h2>
            <div className="types">
              <h3>Types:</h3>
              <ul>
                {pokemon.types.map((type) => (
                  <li key={type.type.name}>{type.type.name}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pokemon-stats">
            {showMoves ? (
              <div>
                <h3>Moves</h3>
                <ul>
                  {pokemon.moves.slice(0, 5).map((move) => (
                    <li key={move.move.name}>{move.move.name}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <div>
                <p>height: {pokemon.height / 10}m</p>
                <p>weight: {pokemon.weight / 10}kg</p>
                <p>hp: {pokemon.stats[0].base_stat}</p>
                <p>attack: {pokemon.stats[1].base_stat}</p>
                <p>defense: {pokemon.stats[2].base_stat}</p>
                <p>special-attack: {pokemon.stats[3].base_stat}</p>
                <p>special-defense: {pokemon.stats[4].base_stat}</p>
                <p>speed: {pokemon.stats[5].base_stat}</p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="controls">
        <button onClick={handlePrev} disabled={pokemonId === 1}>←</button>
        <button onClick={handleNext}>→</button>
      </div>

      <div className="bottom-controls">
        <button className="info-button" onClick={() => setShowMoves(false)} style={{ backgroundColor: !showMoves ? '#aaffaa' : '#eeeeee' }}>Info</button>
        <button className="moves-button" onClick={toggleMoves} style={{ backgroundColor: showMoves ? '#aaffaa' : '#eeeeee' }}>Moves</button>
      </div>
    </div>
  );
};

export default App;
