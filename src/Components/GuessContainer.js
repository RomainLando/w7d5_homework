const GuessContainer = ({guess, handleInput}) => {


    return(
        <div className="guess-container">
            <input type="text" value={guess} onChange={handleInput}></input>
        </div>
    )
}

export default GuessContainer;