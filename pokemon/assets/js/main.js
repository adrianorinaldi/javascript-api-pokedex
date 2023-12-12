const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById('loadMoreButton');
let offset = 0;
const limit = 10;
const maxRecords = 151;

function convertPokemonToHtml(pokemon) {
    return `
    <li class='pokemon ${pokemon.type}'>
    <span class='number'>${pokemon.number}</span>
    <spam class='name'>${pokemon.name}</spam>
    <div class='detail'>
      <ol class='types'>
        ${pokemon.types.map((type) => `<li class='type ${type}'>${type}</li>`).join('')}
      </ol>
      <img src='${pokemon.photo}' alt='${pokemon.name}'>
    </div>
    </li>`
    ;
};

function loadPokemonItens(offset, limit) {

    pokeApi.getPokemons(offset, limit).then((pokemons = []) => { 
        
        const newList = pokemons.map((pokemon) => {
            return convertPokemonToHtml(pokemon);
        });

        const newHtml = newList.join('');
        pokemonList.innerHTML += newHtml;
    });
};

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecordNextPage = offset + limit;

    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItens(offset, limit);
    };
   
});