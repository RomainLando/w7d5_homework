const Header = ({pokedexMode, handleModeSwitch}) => {


    return(
        <div className="header">
            {pokedexMode ? <h1>Pokedex</h1> : <h1>Poke-Guess</h1>}
            <button onClick={handleModeSwitch}>Switch Modes</button>
        </div>
        
    )
}

export default Header;