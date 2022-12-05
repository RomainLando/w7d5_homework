import "./PokemonDesc.css";

const PokemonDesc = ({pokeDesc, pokeTypes}) => {

    const type = pokeTypes.map((element, index) => {
        return <li key={index}>{element}</li>
    })

    return(
        <div className="bio">
            <h3>{pokeDesc}</h3>
            <ul>
                {type}
            </ul>
        </div>

    )
}

export default PokemonDesc;