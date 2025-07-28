import React, { useState, useEffect } from 'react';
import { pokemonApi } from '../services/pokemonApi';

function FilterBar({ selectedType, onTypeChange }) {
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTypes();
  }, []);

  const loadTypes = async () => {
    try {
      setLoading(true);
      setError(null);
      const typesList = await pokemonApi.getTypes();
      setTypes(typesList);
    } catch (err) {
      console.error('Erreur lors du chargement des types:', err);
      setError('Impossible de charger les types');
    } finally {
      setLoading(false);
    }
  };

  // Permet d'avoir l'emoji du type
  const getTypeEmoji = (typeName) => {
    const emojiMap = {
      fire: '🔥', water: '💧', grass: '🌿', electric: '⚡',
      psychic: '🔮', ice: '❄️', dragon: '🐉', dark: '🌑',
      fairy: '🧚', fighting: '👊', poison: '☠️', ground: '🌍',
      flying: '🦅', bug: '🐛', rock: '🗿', ghost: '👻',
      steel: '⚙️', normal: '⚪'
    }; // générer par IA pour ne pas perdre de temps à trouver des emoji
    return emojiMap[typeName] || '❓';
  };

  const handleChange = (e) => {
    onTypeChange(e.target.value);
  };

  if (loading) {
    return (
      <div className="filter-loading">
        <span>Chargement des types...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="filter-error">
        <span>{error}</span>
        <button onClick={loadTypes} className="retry-btn-small">
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="filter-container">
      <select 
        className="filter-select"
        value={selectedType}
        onChange={handleChange}
        aria-label="Filtrer par type de Pokémon"
      >
        <option value="">Tous les types</option>
        {types.map(type => (
          <option key={type.name} value={type.name}>
            {getTypeEmoji(type.name)} {type.name}
          </option>
        ))}
      </select>
      
      {selectedType && (
        <button 
          className="clear-filter-btn"
          onClick={() => onTypeChange('')}
          title="Effacer le filtre"
        >
          X
        </button>
      )}
    </div>
  );
}

export default FilterBar;