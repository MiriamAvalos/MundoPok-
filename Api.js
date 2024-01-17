let POKEAPI_URL = "https://pokeapi.co/api/v2/pokemon/";

for (let i = 1; i <= 151; i++) {
    fetch(POKEAPI_URL + i)
        .then((response) => response.json())
        .then(data => Pokemonlist(data))
        .catch(error => console.error('Error al obtener el Pokémon:', error));
}

function Pokemonlist(data) {
    console.log(data);
}