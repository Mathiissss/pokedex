import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Recherche lancée:', searchTerm);
    onSearch(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div className="search-container">
        <input
          type="text"
          placeholder="Chercher par nom ou numéro (ex: pikachu, 25)..."
          value={searchTerm}
          onChange={handleChange}
          className="search-input"
        />
        
        {searchTerm && (
          <button 
            type="button"
            className="clear-btn"
            onClick={handleClear}
            title="Effacer la recherche"
          >
            Effacer
          </button>
        )}
        
        <button 
          type="submit" 
          className="search-btn"
          title="Lancer la recherche"
        >
          Rechercher
        </button>
      </div>
      
    </form>
  );
}

export default SearchBar;