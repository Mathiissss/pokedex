import React, { useState, useEffect } from 'react';
import PokemonList from './components/PokemonList';
import SearchBar from './components/SearchBar';
import LoadingSpinner from './components/LoadingSpinner';
import { pokemonApi } from './services/pokemonApi';
import './App.css';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadPokemons();
  }, []);

  const loadPokemons = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Chargement des Pokémons...');
      const data = await pokemonApi.getPokemons(40);
      console.log('Pokémon reçus:', data.length);
      
      setPokemons(data);
    } catch (err) {
      console.error('Erreur lors du chargement:', err);
      setError('Impossible de charger les Pokémons');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (term) => {
    console.log('Recherche demandée:', term);
    setSearchTerm(term);
    
    if (term.trim()) {
      try {
        setLoading(true);
        setError(null);
        
        const results = await pokemonApi.searchPokemon(term);
        console.log('Résultat de recherche:', results);
        
        if (results.length === 0) {
          setError(`Aucun Pokémon trouvé pour "${term}"`);
        }
        
        setPokemons(results);
      } catch (err) {
        console.error('Erreur lors de la recherche:', err);
        setError('Erreur lors de la recherche');
      } finally {
        setLoading(false);
      }
    } else {
      console.log('La recherche est vide, rechargement de la liste');
      loadPokemons();
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Pokédex</h1>
        <p>Découvrez vos Pokémons préférés !</p>
        
        <SearchBar onSearch={handleSearch} />
        
        {searchTerm && (
          <div className="search-indicator">
            <p>Recherche: "{searchTerm}"</p>
            <button 
              onClick={() => handleSearch('')}
              className="reset-search-btn"
            >
              Voir tous les Pokémons
            </button>
          </div>
        )}
      </header>
      
      <main>
        {error && (
          <div className="error-message">
            <p>Erreur {error}</p>
            <button onClick={() => handleSearch('')}>
              Retour à la liste complète
            </button>
          </div>
        )}
        
        {loading ? (
          <LoadingSpinner 
            message={searchTerm ? 
              `Recherche de "${searchTerm}"...` : 
              "Chargement des Pokémonss..."
            } 
          />
        ) : (
          <PokemonList pokemons={pokemons} />
        )}
      </main>
    </div>
  );
}

export default App;