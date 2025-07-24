import React, {useState, useEffect} from 'react';
import PokemonList from './components/PokemonList';
import {pokemonApi} from './services/pokemonApi';
import './App.css';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPokemons();
  }, []);

  const loadPokemons = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Chargement des Pokémons...');
      const data = await pokemonApi.getPokemons(20);
      console.log('Pokémons reçus:', data);
      
      setPokemons(data);
    } catch (err) {
      console.error('Erreur lors du chargement:', err);
      setError('Impossible de charger les Pokémon');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Pokédex</h1>
        <p>Découvrez vos Pokémons !</p>
      </header>
      
      <main>
        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={loadPokemons}>Réessayer</button>
          </div>
        )}
        
        {loading ? (
          <div className="loading">
            <p>Chargement des Pokémons...</p>
          </div>
        ) : (
          <PokemonList pokemons={pokemons} />
        )}
      </main>
    </div>
  );
}

export default App;