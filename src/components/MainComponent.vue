<template>
    <div class="container">
        <div class="background"></div>
        <div class="ash">
            <img src="../assets/ash.gif" alt="">
        </div>

        <!-- <div class="pokedex">
            <img @click="" src="../assets/pokedex_fechada.png" alt="Capa da Pokedex" style="width: 21vw;">
        </div> -->
        
        <div class="aberta">
            <img src="../assets/pokedex_aberta.png" alt="Pokedex" style="width: 20vw;">
        </div>
        
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup () {
        

        return {}
    }
})
</script>

<style scoped>
.aberta,
.pokedex {
  position: absolute;
  top: 0;
  right: 40%;
}


.ash{
    position: absolute;
    left: 90%;
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