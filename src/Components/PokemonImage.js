import "./PokemonImage.css";

const PokemonImage = ({pokePic, pokedexMode}) => {

    
    return(
        <>
        {pokedexMode ? <img src={pokePic}></img> : <img className="guess" src={pokePic}></img>}
        </>
        
    )
}

export default PokemonImage;