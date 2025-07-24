const BASE_URL = 'https://pokeapi.co/api/v2';

export const pokemonApi = {
  async getPokemons(limit = 20) {
    try {
      console.log(`Récupération de ${limit} Pokémon...`);
      
      const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}`);
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Liste reçue:', data);

      const pokemonDetails = [];
      
      for (let i = 0; i < data.results.length; i++) {
        const pokemon = data.results[i];
        console.log(`Chargement de ${pokemon.name}...`);
        
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
      throw new Error('Impossible de charger les Pokémons');
    }
  }
};