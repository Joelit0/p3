const apiUrl = 'https://pokeapi.co/api/v2/pokemon';
let offset = 0;
const limit = 20;

document.addEventListener('DOMContentLoaded', () => {
  fullPokemonList();

  document.getElementById('loadMore').addEventListener('click', fullPokemonList);
  document.getElementById('searchBar').addEventListener('input', searchPokemon);
});

async function fullPokemonList() {
  const response = await fetch(`${apiUrl}?offset=${offset}&limit=${limit}`);
  const data = await response.json();

  for (const pokemon of data.results) { await createPokemonCard(pokemon.url); }

  offset += limit;
}

async function createPokemonCard(url) {
  const response = await fetch(url);
  const pokemon  = await response.json();
  const pokemonCard     = document.createElement('div');
  const pokemonList     = document.getElementById('pokemonList');

  pokemonCard.classList.add('pokemon-card');

  pokemonCard.innerHTML = `
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
    <h3>${pokemon.name}</h3>
  `;

  pokemonCard.addEventListener('click', () => showPokemonDetails(pokemon));

  pokemonList.appendChild(pokemonCard);
}

function showPokemonDetails(pokemon) {
  const detailsContainer = document.getElementById('pokemonDetails');

  detailsContainer.style.display = 'block';

  detailsContainer.innerHTML = `
    <h2>${pokemon.name}</h2>
    <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}" style="width:345px;">
    <p><strong>Tipo(s):</strong> ${pokemon.types.map(t => t.type.name).join(', ')}</p>
    <p><strong>Habilidades:</strong> ${pokemon.abilities.map(a => a.ability.name).join(', ')}</p>
    <p><strong>Estadisticas:</strong></p>
    <ul>${pokemon.stats.map(s => `<li>${s.stat.name}: ${s.base_stat}</li>`).join('')}</ul>
  `;
}

function searchPokemon(event) {
  const searchTerm = event.target.value.toLowerCase();
  const pokemonCards = document.querySelectorAll('.pokemon-card');

  pokemonCards.forEach(card => {
    const name = card.querySelector('h3').innerText.toLowerCase();

    card.style.display = name.includes(searchTerm) ? 'block' : 'none';
  });
}
