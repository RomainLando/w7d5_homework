import "./Header.css"

const Header = ({pokedexMode, handleModeSwitch}) => {


    return(
        <div className="header">
            {pokedexMode ? <h1>PokeDex</h1> : <h1>PokeGues</h1>}
            <button onClick={handleModeSwitch}>Switch Modes</button>
        </div>
        
    )
}

export default Header;