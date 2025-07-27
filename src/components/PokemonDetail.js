import React, { useEffect } from 'react';

function PokemonDetail({ pokemon, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const formatPokemonId = (id) => `#${id.toString().padStart(3, '0')}`;
  const formatHeight = (height) => `${(height / 10).toFixed(1)}m`;
  const formatWeight = (weight) => `${(weight / 10).toFixed(1)}kg`;

  const getTypeColor = (typeName) => {
    const colors = {
      fire: '#e74c3c', water: '#3498db', grass: '#27ae60',
      electric: '#f1c40f', psychic: '#9b59b6', ice: '#85c1e9',
      dragon: '#8e44ad', dark: '#34495e', fairy: '#fd79a8',
      fighting: '#e67e22', poison: '#8e44ad', ground: '#d35400',
      flying: '#85c1e9', bug: '#27ae60', rock: '#7f8c8d',
      ghost: '#9b59b6', steel: '#95a5a6', normal: '#bdc3c7'
    };
    return colors[typeName] || '#95a5a6';
  };

  const getStatName = (statName) => {
    const statNames = {
      'hp': 'Points de Vie',
      'attack': 'Attaque',
      'defense': 'Défense',
      'special-attack': 'Att. Spé.',
      'special-defense': 'Déf. Spé.',
      'speed': 'Vitesse'
    };
    return statNames[statName] || statName;
  };

  const getStatBarColor = (statValue) => {
    if (statValue >= 100) return '#e74c3c';
    if (statValue >= 70) return '#f39c12';
    if (statValue >= 40) return '#f1c40f';
    return '#27ae60';
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!pokemon) return null;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button 
          className="modal-close" 
          onClick={onClose}
          aria-label="Fermer les détails"
        >
          X
        </button>
        
        <div className="pokemon-detail-header">
          <div className="pokemon-detail-image">
            {pokemon.sprites?.other?.['official-artwork']?.front_default ? (
              <img 
                src={pokemon.sprites.other['official-artwork'].front_default} 
                alt={pokemon.name}
              />
            ) : pokemon.sprites?.front_default ? (
              <img 
                src={pokemon.sprites.front_default} 
                alt={pokemon.name}
              />
            ) : (
              <div className="pokemon-placeholder-large">?</div>
            )}
          </div>
          
          <h2 className="pokemon-detail-name">{pokemon.name}</h2>
          <div className="pokemon-detail-id">{formatPokemonId(pokemon.id)}</div>
        </div>

        <div className="detail-section">
          <h3 className="detail-title">Types</h3>
          <div className="pokemon-types-detail">
            {pokemon.types?.map((type, index) => (
              <span 
                key={index} 
                className="type-badge type-detail"
                style={{ backgroundColor: getTypeColor(type.type.name) }}
              >
                {type.type.name}
              </span>
            ))}
          </div>
        </div>

        <div className="detail-section">
          <h3 className="detail-title">Statistiques</h3>
          <div className="stats-detail-grid">
            {pokemon.stats?.map((stat, index) => (
              <div key={index} className="stat-detail-item">
                <div className="stat-detail-name">
                  {getStatName(stat.stat.name)}
                </div>
                <div className="stat-detail-bar">
                  <div 
                    className="stat-detail-fill"
                    style={{
                      width: `${Math.min((stat.base_stat / 200) * 100, 100)}%`,
                      backgroundColor: getStatBarColor(stat.base_stat)
                    }}
                  ></div>
                </div>
                <div className="stat-detail-value">{stat.base_stat}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="detail-section">
          <h3 className="detail-title">Informations</h3>
          <div className="info-detail-grid">
            <div className="info-detail-card">
              <div className="info-detail-value">{formatHeight(pokemon.height)}</div>
              <div className="info-detail-label">Taille</div>
            </div>
            <div className="info-detail-card">
              <div className="info-detail-value">{formatWeight(pokemon.weight)}</div>
              <div className="info-detail-label">Poids</div>
            </div>
            <div className="info-detail-card">
              <div className="info-detail-value">{pokemon.base_experience || 'N/A'}</div>
              <div className="info-detail-label">Exp. Base</div>
            </div>
          </div>
        </div>

        {pokemon.abilities && pokemon.abilities.length > 0 && (
          <div className="detail-section">
            <h3 className="detail-title">Capacités</h3>
            <div className="abilities-detail-list">
              {pokemon.abilities.map((ability, index) => (
                <span key={index} className="ability-detail-badge">
                  {ability.ability.name}
                  {ability.is_hidden && <span className="hidden-ability-indicator"> (Cachée)</span>}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PokemonDetail;