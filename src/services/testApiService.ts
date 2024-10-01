const ApiService = require('./ApiService');

async function testGetPokemon(nameOrId: string | number) {
    try {
        const response = await ApiService.getPokemon()
        console.log(`Dados:`, response.data);
    }catch (error){
        console.error('Erro ao buscar os dados do Pokémon', error);
    }
}

async function testGetPokemonList() {
    try {
        const response = await ApiService.getPokemonList(5, 0);
        console.log('Lista:', response.data.results)
    }catch (error){
        console.error('Erro ao buscar os dados do Pokémon', error);
    }
}

async function testGetPokemonSpecies() {
    try {
      const response = await ApiService.getPokemonSpecies('pikachu');
      console.log('Pokémon Species Data:', response.data);
    } catch (error) {
      console.error('Error fetching Pokémon species:', error);
    }
}

async function runTests() {
    await testGetPokemon('infernape');
    await testGetPokemonList();
    await testGetPokemonSpecies();
}
  
runTests();