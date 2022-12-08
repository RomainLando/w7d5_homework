import './PokemonTitle.css';

const PokemonTitle = ({pokeName, pokemonID, pokedexMode}) => {


    return(
        <>
        {pokedexMode ? <h2>#{pokemonID} {pokeName}</h2> : <h2>#?? ????????</h2>}
        </>  
    )
}

export default PokemonTitle;