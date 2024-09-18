const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const pokemonImgContainer = document.getElementById("pokemon-img-container");
const types = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

const pokemonUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";

const eachPokemonData = [];

const fetchPokemon = async () => {
    try{
        const res = await fetch(pokemonUrl);
        const data = await res.json();
        const {results} = data;
        results.forEach(el => {
            fetchEachPokemon(el.url);
        });
        console.log(eachPokemonData);
    } catch(error){
        console.log("fetchPokemon error: " + error);
    }
}

const fetchEachPokemon = async (url) => {
    try{
        const res = await fetch(url);
        const data = await res.json();
        const {id, name, weight, height, sprites, stats, types} = data;
        
        eachPokemonData.push({
            id: id,
            name: name,
            weight: weight,
            height: height,
            frontImgUrl: sprites.front_default,
            hp: stats[0].base_stat,
            attack: stats[1].base_stat,
            defense: stats[2].base_stat,
            "special-attack": stats[3].base_stat,
            "special-defense": stats[4].base_stat,
            speed: stats[5].base_stat,
            types: types
        });
    } catch(error){
        console.log("fetchEachPokemon error: " + error);
    }
}

fetchPokemon();

searchButton.addEventListener("click", () => {
    const input = searchInput.value.toLowerCase();
    let searchIndex = -1;
    

    eachPokemonData.some((el, index) => {
        if(el.id == input || el.name == input){
            searchIndex = index;
        }
        return el.id == input || el.name == input;
    })

    if(searchIndex !== -1){
        renderStat(eachPokemonData[searchIndex]);
    }else{
        alert("Pokémon not found");
    }
});

const renderStat = (pokemonData) => {
    types.innerHTML = "";

    pokemonName.textContent = pokemonData.name;
    pokemonId.textContent = "#" + pokemonData.id;
    weight.textContent = "Weight: " + pokemonData.weight;
    height.textContent = "Height: " + pokemonData.height;
    pokemonImgContainer.innerHTML = `<img id="sprite" class="pokemon-img" src="${pokemonData.frontImgUrl}" />`;
    pokemonData.types.forEach(el => {
        types.innerHTML += `<span class="inline-block type ${el.type.name}">${el.type.name}</span>`;
    })
    hp.textContent = pokemonData.hp;
    attack.textContent = pokemonData.attack;
    defense.textContent = pokemonData.defense;
    specialAttack.textContent = pokemonData["special-attack"]
    specialDefense.textContent = pokemonData["special-defense"];
    speed.textContent = pokemonData.speed;
}








