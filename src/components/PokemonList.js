import React from 'react';
import PokemonCard from './PokemonCard';

function PokemonList({ pokemons }) {
  
  if (!pokemons || pokemons.length === 0) {
    return (
      <div className="empty-state">
        <h3>Aucun Pokémons trouvé</h3>
        <p>Il semble qu'il n'y ait pas de Pokémons à afficher.</p>
      </div>
    );
  }

  return (
    <div className="pokemon-list">
      <div className="pokemon-count">
        <p>{pokemons.length} Pokémons trouvés</p>
      </div>
      
      <div className="pokemon-grid">
        {pokemons.map(pokemon => (
          <PokemonCard 
            key={pokemon.id} 
            pokemon={pokemon} 
          />
        ))}
      </div>
    </div>
  );
}

export default PokemonList;