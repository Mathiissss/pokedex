const BASE_URL = 'https://pokeapi.co/api/v2';
const POKEMON_PER_PAGE = 15;

export const pokemonApi = {
  // récupérer les pokémons avec pagination
  async getPokemons(page = 1) {
    try {
      const offset = (page - 1) * POKEMON_PER_PAGE;
      
      const response = await fetch(`${BASE_URL}/pokemon?limit=${POKEMON_PER_PAGE}&offset=${offset}`);
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      
      // récupérer les détails de chaque pokémon
      const pokemonDetails = [];
      for (let pokemon of data.results) {
        try {
          const detailResponse = await fetch(pokemon.url);
          if (detailResponse.ok) {
            const detail = await detailResponse.json();
            pokemonDetails.push(detail);
          }
        } catch (error) {
        }
      }

      return {
        pokemons: pokemonDetails,
        total: data.count,
        hasNext: data.next !== null,
        hasPrevious: data.previous !== null,
        totalPages: Math.ceil(data.count / POKEMON_PER_PAGE)
      };
      
    } catch (error) {
      throw new Error('Impossible de charger les Pokémon');
    }
  },

  // rechercher par nom ou numéro
  async searchPokemon(searchTerm) {
    try {
      if (!searchTerm || searchTerm.trim() === '') {
        return [];
      }

      const cleanSearchTerm = searchTerm.toLowerCase().trim();
      
      // essayer de trouver directement
      const response = await fetch(`${BASE_URL}/pokemon/${cleanSearchTerm}`);
      
      if (response.ok) {
        const pokemon = await response.json();
        return [pokemon];
      } else {
        return [];
      }
      
    } catch (error) {
      return [];
    }
  },

  // récupérer tous les types
  async getTypes() {
    try {
      const response = await fetch(`${BASE_URL}/type`);
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      
      // filtrer les types bizarres
      const mainTypes = data.results.filter(type => 
        !['unknown', 'shadow'].includes(type.name)
      );
      
      return mainTypes;
      
    } catch (error) {
      throw new Error('Impossible de charger les types');
    }
  },

  // récupérer pokémons d'un type
  async getPokemonByType(typeName) {
    try {
      const response = await fetch(`${BASE_URL}/type/${typeName}`);
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      
      // limite à 50
      const pokemonUrls = data.pokemon.slice(0, 50).map(p => p.pokemon.url);
      
      // récupérer les détails
      const pokemonDetails = [];
      for (let url of pokemonUrls) {
        try {
          const response = await fetch(url);
          if (response.ok) {
            const pokemon = await response.json();
            pokemonDetails.push(pokemon);
          }
        } catch (error) {
        }
      }
      
      return pokemonDetails;
      
    } catch (error) {
      throw new Error(`Impossible de charger les Pokémon de type ${typeName}`);
    }
  }
};