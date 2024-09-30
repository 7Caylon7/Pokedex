<template>
  <MainComponent />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MainComponent from './components/MainComponent.vue';


export default defineComponent({
  name: 'App',
  components: {
    MainComponent
  }
});
</script>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  overflow: hidden;
}
</style>
