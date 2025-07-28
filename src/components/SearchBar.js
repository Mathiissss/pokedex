import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const clearSearch = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div className="search-container">
        <input
          type="text"
          placeholder="Chercher par nom ou numéro (ex: pikachu, 25)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        
        {/* bouton effacer si y'a du texte */}
        {searchTerm && (
          <button
            type="button"
            className="clear-btn"
            onClick={clearSearch}
          >
            Effacer
          </button>
        )}
        
        <button type="submit" className="search-btn">
          Rechercher
        </button>
      </div>
    </form>
  );
}

export default SearchBar;