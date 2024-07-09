const APIurl = 'https://pokeapi-proxy.freecodecamp.rocks/'

const pokemonName = document.getElementById('pokemon-name');
const id = document.getElementById('pokemon-id');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const types = document.getElementById('types');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');
const image = document.getElementById('pokemon-img');

const searchBtn = document.getElementById('search-button');
const userInput = document.getElementById('search-input');

function reset(){

    pokemonName.textContent = '';
    id.textContent = '';
    weight.textContent = '';
    height.textContent = '';
    hp.textContent = '';
    attack.textContent = '';
    defense.textContent = '';
    specialAttack.textContent = '';
    specialDefense.textContent = '';
    speed.textContent = '';

    image.src = 'https://i.pinimg.com/564x/17/45/75/1745752335029d4077136573dfc27817.jpg';

}

async function searchPokemon(){
    try{   
    const pokemonInput = userInput.value.toLowerCase();
    console.log(pokemonInput);

    const response = await fetch(`APIurl${pokemonInput}`);
    console.log(response);

    const pokemonData = await response.json();

    pokemonName.textContent = pokemonData.name;
    id.textContent = pokemonData.id;
    weight.textContent = pokemonData.weight;
    height.textContent = pokemonData.height;

    let typesHTML = '';
    for(let i; i<pokemonData.types.length; i++){
        typesHTML += `<div>${pokemonData.types[i].type.name}</div>`
    }
    types.innerHTML = typesHTML;

    const stats = pokemonData.stats;
    hp.textContent = stats[0];
    attack.textContent = stats[1];
    defense.textContent = stats[2];
    specialAttack.textContent = stats[3];
    specialDefense.textContent = stats[4];
    speed.textContent = stats[5];

    image.src = pokemonData.sprites.front_default;

    }catch(err){
        reset();
        alert("Invalid Pokémon name or id");
        console.log(err);
    }
}

searchBtn.addEventListener('click', e => {
    e.preventDefault();
    searchPokemon();
});