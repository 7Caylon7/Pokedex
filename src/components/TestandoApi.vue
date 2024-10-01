<template>
    <div>
      <h1>{{ pokemon.name }}</h1>
      <img :src="pokemon.sprites.front_default" alt="Pokémon image" />
    </div>
  </template>
  
  <script lang="ts">
  import { ref, onMounted, defineComponent } from 'vue';
  import ApiService from '../services/ApiService';  // Importando como padrão
  
  export default defineComponent({
    setup() {
      const pokemon = ref({
        name: '',
        sprites: {
          front_default: '',
        },
      });
  
      const fetchPokemon = async (nameOrId: string) => {
        try {
          const response = await ApiService.getPokemon(nameOrId);
          pokemon.value = response.data;
        } catch (error) {
          console.error('Error fetching Pokémon:', error);
        }
      };
  
      onMounted(() => {
        fetchPokemon('pikachu');
      });
  
      return {
        pokemon,
        fetchPokemon,
      };
    },
  });
  </script>
  