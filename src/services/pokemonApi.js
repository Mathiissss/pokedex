const BASE_URL = 'https://pokeapi.co/api/v2';

export const pokemonApi = {
  async getPokemons(limit = 20) {
    try {
      console.log(`Récupération de ${limit} Pokémons...`);
      
      const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}`);
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      const data = await response.json();

      const pokemonDetails = [];
      
      for (let i = 0; i < data.results.length; i++) {
        const pokemon = data.results[i];
        
        try {
          const detailResponse = await fetch(pokemon.url);
          if (detailResponse.ok) {
            const detail = await detailResponse.json();
            pokemonDetails.push(detail);
          }
        } catch (error) {
          console.warn(`Erreur pour ${pokemon.name}:`, error);
        }
      }

      console.log(`${pokemonDetails.length} Pokémons chargés avec succès`);
      return pokemonDetails;
      
    } catch (error) {
      console.error('Erreur dans getPokemons:', error);
    }
  },

  async searchPokemon(searchTerm) {
    try {
      console.log('Recherche de:', searchTerm);
      
      if (!searchTerm || searchTerm.trim() === '') {
        return [];
      }

      const cleanSearchTerm = searchTerm.toLowerCase().trim();
      
      const response = await fetch(`${BASE_URL}/pokemon/${cleanSearchTerm}`);
      
      if (response.ok) {
        const pokemon = await response.json();
        console.log('Pokémon trouvé:', pokemon.name);
        return [pokemon];
      } else {
        console.log('Pokémon non trouvé');
        return [];
      }
      
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
      return [];
    }
  }
};