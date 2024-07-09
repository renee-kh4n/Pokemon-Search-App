const APIurl = 'https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/'

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

const prev = document.getElementById('prev');
const next = document.getElementById('next');

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
    types.innerHTML = '';

    image.src = 'https://i.pinimg.com/564x/17/45/75/1745752335029d4077136573dfc27817.jpg';

}


async function getPokemon(pokemonInput){
    try{
        const response = await fetch(`${APIurl}${pokemonInput}`);
        console.log(response);
    
        const pokemonData = await response.json();
        console.log(pokemonData);
    
        pokemonName.textContent = pokemonData.name;
        id.textContent = pokemonData.id;
        weight.textContent = pokemonData.weight;
        height.textContent = pokemonData.height;
    
        let typesHTML = '';
        for(let i = 0; i<pokemonData.types.length; i++){
            typesHTML += `<span>${pokemonData.types[i].type.name}</span>`
        }
        types.innerHTML = typesHTML;
    
        const stats = pokemonData.stats;
        hp.textContent = stats[0].base_stat;
        attack.textContent = stats[1].base_stat;
        defense.textContent = stats[2].base_stat;
        specialAttack.textContent = stats[3].base_stat;
        specialDefense.textContent = stats[4].base_stat;
        speed.textContent = stats[5].base_stat;
    
        image.src = pokemonData.sprites.front_default;

    }catch(err){
        reset();
        alert("Invalid Pokémon name or id");
        console.log(err);
    }
}

function searchPokemon(){
  
    const pokemonInput = userInput.value.toLowerCase();
    console.log(pokemonInput);

    getPokemon(pokemonInput);
}

async function navigatePokemon(){
    try{
        const responseAll = await fetch(`${APIurl}`);

        const data = await responseAll.json();

        let pokemonID = 1
        if( id.textContent!== undefined | id.textContent !== null){
            pokemonID = Number(id.textContent);
        }
        // console.log(data.results.length);
        // console.log(data.results[data.results.length-1].id);

        const lastID = data.results[data.results.length-1].id;

        next.addEventListener('click', e => {
            e.preventDefault()
            pokemonID += 1;

            if(pokemonID > lastID) pokemonID = 1;
            getPokemon(String(pokemonID));
        })

        prev.addEventListener('click', e => {
            e.preventDefault()
            pokemonID -= 1;

            if(pokemonID < 1) pokemonID = lastID;
            getPokemon(String(pokemonID));
        });
    }catch(err){
        console.log(err);
    }

}

navigatePokemon();

searchBtn.addEventListener('click', e => {
    e.preventDefault();
    searchPokemon();
});