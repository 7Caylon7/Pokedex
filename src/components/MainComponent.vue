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
                    <div class="evolucao" v-if="condition">
                        <h3 class="elements" >Evolução</h3>
                    </div>
                </div>
                <div class="area-pokemon">
                    <div class="pokemon" v-if="pokemon">
                        <img class="pokemon-img"
                            :src="pokemon.sprites.other.dream_world.front_default"
                            alt="Pokémon image" />
                            <p><strong>{{ pokemon.id }} - {{ capitalizedPokemonName }}</strong></p>
                            <button class="btn-tp" v-for="type in getPokemonType()" :key="type" :style="{backgroundColor: typeColors[type]} || '#ccc'">{{ type }}</button>
                    </div>
                    <div v-else>
                        <p>Carregando Pokémon...</p>
                    </div>
                </div>
                <div class="stats">
                    <ul>
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
            <img class="sinnoh-pokedex" src="../assets/pokedex_aberta.png" alt="Pokedex" style="">
            <div class="buttons">
                <button @click="PrevPokemon" class="button" ><</button>
                <button @click="NextPokemon" class="button">></button>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
import {ref, computed, onMounted, defineComponent } from 'vue'
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
    id: string | null;
    name: string | null;
    stats: PokemonStat[];
    types: PokemonType[];
}

export default defineComponent({
    setup() {
        const pokemon = ref<Pokemon | null>(null);
        const pokemonInput = ref(null);
        const currentPokemonId = ref<number>(1);

        //Mapeamento de cores:
        const typeColors = {
            grass: '#78C850',
            fire: '#F08030',
            water: '#6890F0',
            bug: '#A8B820',
            normal: '#A8A878',
            electric: '#F8D030',
            ice: '#98D8D8',
            rock: '#B8A038',
            ghost: '#705898',
            dragon: '#7038F8',
            fighting: '#C03028',
            psychic: '#F85888',
            fairy: '#EE99AC',
            poison: '#A040B0',
            ground: '#E0C068',
            steel: '#B8B8D0',
            flying: '#A98FF3',
        };

        // Função para buscar os dados do Pokémon
        const fetchPokemon = async (nameOrId: string | number) => {
            try {
                const response = await ApiService.getPokemon(nameOrId);
                pokemon.value = response.data;
                currentPokemonId.value = response.data.id;
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

        // Função para obter todas as estats do Pokémon
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

        const NextPokemon = async () => {
            const nextId = currentPokemonId.value + 1;
            await fetchPokemon(nextId);
        };

        const PrevPokemon = async () => {
            if(currentPokemonId.value > 1){
            const prevId = currentPokemonId.value - 1;
            await fetchPokemon(prevId);
            }
        };

        const capitalizedPokemonName = computed(() => {
            if (pokemon.value && pokemon.value.name) {
                return pokemon.value.name.charAt(0).toUpperCase() + pokemon.value.name.slice(1);
            }
            return '';
        });

        onMounted(() => {
            fetchPokemon(currentPokemonId.value);
        });

        return {
            pokemon,
            pokemonInput,
            typeColors,
            fetchPokemon,
            NextPokemon,
            PrevPokemon,
            getPokemonStats,
            getPokemonType,
            capitalizedPokemonName
        };
    },
});
</script>


<style scoped>
.pokedex {
  position: relative;
  top: -100vh;
  right: -1vw;
}

.sinnoh-pokedex {
  height: 90vh;
  width: 90vw;
}

.fundo {
  position: absolute;
  top: 11vh;
  left: 28.8vw;
  width: 48.1vw;
  height: 68.5vh;
  background-color: azure;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.buttons{
    position: absolute;
    top: 41vh;
    left: 13vw;
    height: 20vh;
}

.button,
.btn-tp {
    margin: 3px;
    width: 3vw;
    height: 5vh;
    border: solid 2px #000;
    border-radius: 4px;
    color: #fff;
    background-color: #444;
    box-shadow: -2px 3px 0 #222, -4px 6px 0 #000;
}

.btn-tp{
    box-shadow: none;
    width: 4vw;
    margin-bottom: 0;
}

.button:active{
    background-color: #8c2020;
}


/* elementos do grid */
.pokedex input{
    height: 5vh;
    margin: 1vw 0 1vh 1vh;
    border: solid 2px #444;
    border-radius: 5px;
    box-shadow: -1px 2px 0 #d6d6d6, -2px 4px 0 #000;
}

.area-pokemon{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1vh;
    flex-wrap: wrap;
    text-align: center;
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
    bottom: 0;
}

.stats ul{
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
    align-items: center;
    flex-wrap: wrap;
}

.elements{
    border: 2px solid #000;
    border-radius: 20px;
    padding: 1vh;
    background-color: #444;
    color: #d6d6d6;
    width: 12vw;
}


/* background */
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

/* responsividade */
@media screen and (min-width: 300px) and (max-width: 840px){
    .ash,
    .buttons{
        display: none;
    }

    .background{
        animation: none;
    }


    .pokedex {
        top: -100vh;
        left: 0;
        height: 100vh;
    }

    .fundo {
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
    }

    .button {
        margin: 3px;
        width: 15vw;
    }


    .pokedex input{
        width: 98%;
        margin-left: 1vw;
        text-align: center;
        height: 8vh;
    }

    .area-pokemon{
        align-items: center;
    }

    .search{
        gap: 0;
    }

    .stats{
        left: 0;
        display: flex;
        flex-direction: row;
    }

    .elements{
        width: 40vw;
    }

    .stats ul {
        flex-direction: column;
        width: 50vw;
    }

    .btn-tp {
        width: 20vw;
    }
}
</style>