import React, { useState, useEffect } from 'react';
import PokemonList from './components/PokemonList';
import PokemonDetail from './components/PokemonDetail';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import Pagination from './components/Pagination';
import LoadingSpinner from './components/LoadingSpinner';
import { pokemonApi } from './services/pokemonApi';
import './App.css';

function App() {
  // Variables d'état pour stocker les données
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null); // pour la modal
  
  // états pour la recherche et filtres
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  
  // pagination stuff
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  
  // loading et erreurs
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect pour charger les pokémons au début
  useEffect(() => {
    if (!searchTerm && !selectedType) {
      loadPokemons(currentPage);
    }
  }, [currentPage, searchTerm, selectedType]);

  // fonction pour charger les pokémons avec pagination
  const loadPokemons = async (page) => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await pokemonApi.getPokemons(page);
      
      setPokemons(data.pokemons);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError('Impossible de charger les Pokémon');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (term) => {
    setSearchTerm(term);
    setSelectedType('');
    setCurrentPage(1);
    
    if (term.trim()) {
      try {
        setLoading(true);
        setError(null);
        
        const results = await pokemonApi.searchPokemon(term);
        
        if (results.length === 0) {
          setError(`Aucun Pokémon trouvé pour "${term}"`);
        } else {
          setError(null);
        }
        
        setPokemons(results);
        setTotalPages(0);
      } catch (err) {
        setError('Erreur lors de la recherche');
        setPokemons([]);
      } finally {
        setLoading(false);
      }
    } else {
      // si recherche vide -> recharger
      setCurrentPage(1);
      loadPokemons(1);
    }
  };

  // filtre par type
  const handleTypeFilter = async (type) => {
    setSelectedType(type);
    setSearchTerm(''); // reset la recherche
    setCurrentPage(1);
    
    if (type) {
      try {
        setLoading(true);
        setError(null);
        
        const results = await pokemonApi.getPokemonByType(type);
        
        if (results.length === 0) {
          setError(`Aucun Pokémon de type "${type}" trouvé`);
        } else {
          setError(null);
        }
        
        setPokemons(results);
        setTotalPages(0); // pas de pagination pour les filtres
      } catch (err) {
        setError(`Erreur lors du filtrage par type ${type}`);
        setPokemons([]);
      } finally {
        setLoading(false);
      }
    } else {
      // pas de filtre = recharger page 1
      setCurrentPage(1);
      loadPokemons(1);
    }
  };

  // quand on clique sur un pokémon
  const handlePokemonSelect = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  // fermer la modal
  const handleClosePokemonDetail = () => {
    setSelectedPokemon(null);
  };

  // changement de page
  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSelectedPokemon(null);
    
    // scroll en haut
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // reset tout
  const handleReset = () => {
    setSearchTerm('');
    setSelectedType('');
    setCurrentPage(1);
    setSelectedPokemon(null);
    setError(null);
    loadPokemons(1);
  };

  // clear search seulement
  const handleClearSearch = () => {
    setSearchTerm('');
    if (!selectedType) {
      setCurrentPage(1);
      loadPokemons(1);
    }
  };

  // clear filter seulement
  const handleClearTypeFilter = () => {
    setSelectedType('');
    if (!searchTerm) {
      setCurrentPage(1);
      loadPokemons(1);
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <div className="logo-section">
            <h1>Pokédex</h1>
            <p>Découvrez tous les Pokémons !</p>
          </div>
          
          <div className="search-filters">
            <SearchBar onSearch={handleSearch} />
            <FilterBar 
              selectedType={selectedType}
              onTypeChange={handleTypeFilter} 
            />
          </div>
          
          {(searchTerm || selectedType) && (
            <div className="active-filters">
              {searchTerm && (
                <div className="filter-indicator search-indicator">
                  <span>🔍 Recherche: "{searchTerm}"</span>
                  <button 
                    onClick={handleClearSearch} 
                    className="remove-filter"
                    title="Effacer la recherche"
                  >
                    ✕
                  </button>
                </div>
              )}
              
              {selectedType && (
                <div className="filter-indicator type-indicator">
                  <span>Type: {selectedType}</span>
                  <button 
                    onClick={handleClearTypeFilter} 
                    className="remove-filter"
                    title="Effacer le filtre"
                  >
                    ✕
                  </button>
                </div>
              )}
              
              <button onClick={handleReset} className="reset-all-btn">
                Voir tous les Pokémons
              </button>
            </div>
          )}

          <div className="results-info">
            {searchTerm || selectedType ? (
              <p>
                {loading ? 'Recherche en cours...' : `${pokemons.length} résultat(s) trouvé(s)`}
              </p>
            ) : (
              <p>
                {loading ? 'Chargement...' : `Page ${currentPage} sur ${totalPages} • ${pokemons.length} Pokémons`}
              </p>
            )}
          </div>
        </div>
      </header>

      <main className="main-content">
        {error && (
          <div className="error-message">
            <div className="error-content">
              <p>{error}</p>
              <div className="error-actions">
                <button onClick={() => setError(null)} className="dismiss-error-btn">
                  Fermer
                </button>
                <button onClick={handleReset} className="retry-btn">
                  Retour à la liste complète
                </button>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <LoadingSpinner 
            message={
              searchTerm ? `Recherche de "${searchTerm}"...` :
              selectedType ? `Chargement des Pokémon de type ${selectedType}...` :
              "Chargement des Pokémon..."
            } 
          />
        ) : (
          <>
            <PokemonList 
              pokemons={pokemons}
              onPokemonSelect={handlePokemonSelect}
            />
            
            {/* pagination si pas de recherche/filtre */}
            {!searchTerm && !selectedType && totalPages > 1 && (
              <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                loading={loading}
              />
            )}

            {/* message si rien trouvé */}
            {!loading && pokemons.length === 0 && !error && (
              <div className="no-results">
                <div className="no-results-icon">😅</div>
                <h3>Aucun Pokémon trouvé</h3>
                <p>
                  {searchTerm && `Aucun résultat pour "${searchTerm}"`}
                  {selectedType && `Aucun Pokémon de type "${selectedType}" trouvé`}
                  {!searchTerm && !selectedType && "Aucun Pokémon à afficher"}
                </p>
                <button onClick={handleReset} className="back-to-list-btn">
                  🏠 Retour à la liste complète
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {selectedPokemon && (
        <PokemonDetail 
          pokemon={selectedPokemon}
          onClose={handleClosePokemonDetail}
        />
      )}
    </div>
  );
}

export default App;