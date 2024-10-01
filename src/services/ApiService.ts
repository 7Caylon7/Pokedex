import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Exportando as funções diretamente
const getPokemon = (pokemonNameOrId: string | number) => {
  return apiClient.get(`/pokemon/${pokemonNameOrId}`);
};

const getPokemonList = (limit = 10, offset = 0) => {
  return apiClient.get(`/pokemon`, {
    params: {
      limit,
      offset,
    },
  });
};

const getPokemonSpecies = (pokemonNameOrId: string | number) => {
  return apiClient.get(`/pokemon-species/${pokemonNameOrId}`);
};

export default {
  getPokemon,
  getPokemonList,
  getPokemonSpecies,
};