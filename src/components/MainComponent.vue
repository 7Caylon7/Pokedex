<template>
    <div class="container">
        <div class="background"></div>
        <div class="ash">
            <img src="../assets/ash.gif" alt="Gif Ash Running" style="width: 35vh;">
        </div>

        <div class="pokedex">
            <div class="fundo">
                <div class="area_stats">
                    <input type="text" placeholder="Name or Number" v-model="pokemonInput" @keyup.enter="fetchPokemon(pokemonInput.toLowerCase())">
                    <h3 class="elements">Status</h3>
                    <p class="elements">Vida:</p>
                    <p class="elements">Ataque:</p>
                    <p class="elements">Defesa:</p>
                    <p class="elements">Ataque Especial:</p>
                    <p class="elements">Defesa Especial:</p>
                    <p class="elements">Velocidade:</p>
                    <h3 class="elements">Tipo:<button>Tipo</button></h3>
                </div>
                <div class="evolutions">
                    <h3 class="elements">Evoluções:</h3>
                </div>
                <div v-if="pokemonInput">
                    <img class="pokemon_img"
                        :src="pokemon.sprites.versions['generation-v']?.['black-white']?.animated?.front_default"
                        alt="Pokémon image" />
                </div>
                <div v-else>
                    <p>Carregando Pokémon...</p>
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

export default defineComponent({
    setup () {
        const pokemon = ref({
            id: '',
            name: '',
            sprites: {
                versions:''
            }
        });
        const pokemonInput = ref({
            id:''
        });

        //Função para buscar os dados do pokemon
        const fetchPokemon = async (nameOrId: string | number) =>{
            try {
                const response = await ApiService.getPokemon(nameOrId);
                pokemon.value = response.data;
            }catch (error) {
                console.error('Erro ao buscar pokemon', error);
            }
        }

        onMounted(()=> {
            fetchPokemon('bulbasaur');
        })


        return {
            pokemon,
            pokemonInput,
            fetchPokemon,
        }
    }
})
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

.button{
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
    width: 90%;
    height: 5vh;
    margin-left: 2vw;
    margin-bottom: 1vh;
    border: solid 2px #444;
    border-radius: 5px;
    box-shadow: -1px 2px 0 #d6d6d6, -2px 4px 0 #000;
}

.area_stats{
    margin-left: .5vw;
}

.elements{
    margin-bottom: 1.5vh;
}

.pokemon_img{
    position: absolute;
    top: 5vh;
    left: 25vw;
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