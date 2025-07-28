import React from 'react';

function PokemonCard({ pokemon, onPokemonSelect }) {
  // formater le numéro avec des zéros
  const formatNumber = (num) => `#${num.toString().padStart(3, '0')}`;

  // couleurs des types
  const getTypeColor = (type) => {
    const colors = {
      fire: '#e74c3c', water: '#3498db', grass: '#27ae60',
      electric: '#f1c40f', psychic: '#9b59b6', ice: '#85c1e9',
      dragon: '#8e44ad', dark: '#34495e', fairy: '#fd79a8',
      fighting: '#e67e22', poison: '#8e44ad', ground: '#d35400',
      flying: '#85c1e9', bug: '#27ae60', rock: '#7f8c8d',
      ghost: '#9b59b6', steel: '#95a5a6', normal: '#bdc3c7'
    };
    return colors[type] || '#95a5a6';
  };

  // si pas de données
  if (!pokemon || !pokemon.sprites) {
    return (
      <div className="pokemon-card error">
        <p>Erreur de chargement</p>
      </div>
    );
  }

  return (
    <div className="pokemon-card" onClick={() => onPokemonSelect(pokemon)}>
      <div className="pokemon-number">
        {formatNumber(pokemon.id)}
      </div>
      
      <div className="pokemon-image-container">
        {pokemon.sprites.front_default ? (
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="pokemon-image"
          />
        ) : (
          <div className="pokemon-placeholder">?</div>
        )}
      </div>
      
      <h3 className="pokemon-name">{pokemon.name}</h3>
      
      <div className="pokemon-types">
        {pokemon.types && pokemon.types.map((type, index) => (
          <span
            key={index}
            className="type-badge"
            style={{ backgroundColor: getTypeColor(type.type.name) }}
          >
            {type.type.name}
          </span>
        ))}
      </div>
      
      {/* stats preview */}
      <div className="pokemon-stats-preview">
        {pokemon.stats && pokemon.stats.slice(0, 3).map((stat, index) => (
          <div key={index} className="stat-preview">
            <span className="stat-name">
              {stat.stat.name === 'hp' ? 'HP' :
               stat.stat.name === 'attack' ? 'ATK' : 'DEF'}
            </span>
            <span className="stat-value">{stat.base_stat}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PokemonCard;