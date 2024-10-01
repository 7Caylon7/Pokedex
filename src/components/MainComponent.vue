<template>
    <div class="container">
        <div class="background"></div>
        <div class="ash">
            <img src="../assets/ash.gif" alt="Gif Ash Running" style="width: 35vh;">
        </div>

        <div class="pokedex">
            <div class="fundo">
                <div class="search">
                    <input type="text" placeholder="Name or Number" v-model="pokemonInput" @keyup.enter="fetchPokemon(pokemonInput.toLowerCase())">
                    <div class="evolucao">
                        <h3 class="elements">Evoluções</h3>
                    </div>
                </div>
                <div class="area-pokemon">
                    <div class="pokemon" v-if="pokemonInput">
                        <img class="pokemon-img"
                            :src="pokemon.sprites.other.dream_world.front_default"
                            alt="Pokémon image" />
                            <p><strong>{{ pokemon.id }} - {{ pokemon.name }}</strong></p>
                    </div>
                    <div v-else>
                        <p>Carregando Pokémon...</p>
                    </div>
                </div>
                <div class="stats">
                    <ul>
                        <li><button class="btn-tp" v-for="type in getPokemonType()" :key="type">{{ type }}</button></li>
                        <li class="elements">HP: {{ getPokemonStats().Hp }}</li>
                        <li class="elements">Attack: {{ getPokemonStats().Attack }}</li>
                        <li class="elements">Defense: {{ getPokemonStats().Defense }}</li>
                    </ul>
                    <ul>
                        <li class="elements">Special Attack: {{ getPokemonStats().SpecialAttack }}</li>
                        <li class="elements">Special Defense: {{ getPokemonStats().SpecialDefense }}</li>
                        <li class="elements">Speed: {{ getPokemonStats().Speed }}</li>
                    </ul>
                </div>
            </div>
            <img src="../assets/pokedex_aberta.png" alt="Pokedex" style="height: 70vh; width: 80vw;">

            <div class="buttons">
                <button class="button"><</button>
                <button class="button">></button>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
import {ref, onMounted, defineComponent } from 'vue'
import  ApiService  from '../services/ApiService';

// Interface para os stats do Pokémon
interface PokemonStat {
    base_stat: number;
    stat: {
        name: string;
    };
}

interface PokemonType {
    type: {
        name: string;
    }
}

// Interface para o objeto Pokémon
interface Pokemon {
    name: string;
    stats: PokemonStat[];
    types: PokemonType[];
}

export default defineComponent({
    setup() {
        // Definir o tipo do 'pokemon' como 'Pokemon | null' para evitar erro 'never'
        const pokemon = ref<Pokemon | null>(null);
        const pokemonInput = ref(null);

        // Função para buscar os dados do Pokémon
        const fetchPokemon = async (nameOrId: string | number) => {
            try {
                const response = await ApiService.getPokemon(nameOrId);
                pokemon.value = response.data;
            } catch (error) {
                console.error('Erro ao buscar Pokémon', error);
            }
        };

        const getPokemonType = () => {
            if(pokemon.value && pokemon.value.types) {
                return pokemon.value.types.map(type => type.type.name)
            }
            return [];
        }

        // Função para obter todas as estatísticas do Pokémon
        const getPokemonStats = () => {
            if (pokemon.value) {
                const hpStats = pokemon.value.stats.find(
                    (stat) => stat.stat.name === 'hp'
                );
                const attackStats = pokemon.value.stats.find(
                    (stat) => stat.stat.name === 'attack'
                );
                const defenseStats = pokemon.value.stats.find(
                    (stat) => stat.stat.name === 'defense'
                );
                const specialAttackStats = pokemon.value.stats.find(
                    (stat) => stat.stat.name === 'special-attack'
                );
                const specialDefenseStats = pokemon.value.stats.find(
                    (stat) => stat.stat.name === 'special-defense'
                );
                const speedStats = pokemon.value.stats.find(
                    (stat) => stat.stat.name === 'speed'
                );

                return {
                    Hp: hpStats ? hpStats.base_stat : 'N/A',
                    Attack: attackStats ? attackStats.base_stat : 'N/A',
                    Defense: defenseStats ? defenseStats.base_stat : 'N/A',
                    SpecialAttack: specialAttackStats ? specialAttackStats.base_stat : 'N/A',
                    SpecialDefense: specialDefenseStats ? specialDefenseStats.base_stat : 'N/A',
                    Speed: speedStats ? speedStats.base_stat : 'N/A',
                };
            }

            // Retorno padrão enquanto os dados ainda não estão disponíveis
            return {
                Hp: 'Carregando...',
                Attack: 'Carregando...',
                Defense: 'Carregando...',
                SpecialAttack: 'Carregando...',
                SpecialDefense: 'Carregando...',
                Speed: 'Carregando...',
            };
        };

        onMounted(() => {
            fetchPokemon('bulbasaur');
        });

        return {
            pokemon,
            pokemonInput,
            fetchPokemon,
            getPokemonStats,
            getPokemonType
        };
    },
});
</script>


<style scoped>
.pokedex {
  position: absolute;
  top: 10vh;
  right: 12vw;
}

.fundo{
    position: absolute;
    top: 8.6vh;
    left: 25.7vw;
    width: 42.6vw;
    height: 53vh;
    background-color: azure;
    border-radius: 8px;
}

.buttons{
    position: absolute;
    top: 32vh;
    left: 11vw;
    height: 20vh;
}

.button {
    margin: 3px;
    width: 3vw;
    height: 5vh;
    border: solid 2px #000;
    border-radius: 4px;
    color: #fff;
    background-color: #444;
    box-shadow: -2px 3px 0 #222, -4px 6px 0 #000;
}

.button:active{
    background-color: #8c2020;
}

.pokedex input{
    width: 40%;
    height: 5vh;
    margin-left: 2vw;
    margin-bottom: 1vh;
    border: solid 2px #444;
    border-radius: 5px;
    box-shadow: -1px 2px 0 #d6d6d6, -2px 4px 0 #000;
}

.search{
    display: flex;
    flex-direction: row;
    gap: 7rem;
    margin: 0 .5vw;
}

.area-pokemon{
    display: flex;
    flex-direction: column;
    margin-left: 5vw;
}

.pokemon-img {
    max-width: 250px;
    max-height: 180px;
    object-fit: cover;
}

.pokemon p{
    margin-left: 2rem;
}

.stats{
    position: absolute;
    left: 1rem;
    bottom: 0;
}

.stats ul{
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
}

.elements{
    border: 1px solid #000;
    border-radius: 20px;
    padding: 1vh;
    background-color: #444;
    color: #d6d6d6;
}

.ash{
    position: absolute;
    left: 87vw;
    bottom: 0;
}

.background{
    background-image: url('../assets/background.jpg');
    background-repeat: repeat-x;
    background-size: cover;
    background-position: 0 0;
    width: 100vw;
    height: 100vh;
    position: relative;
    animation: moveBackground 9s linear infinite;
}

@keyframes moveBackground {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 100vw 0;
  }
}
</style>