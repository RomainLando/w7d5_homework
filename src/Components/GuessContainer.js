import "./GuessContainer.css"

const GuessContainer = ({guess, handleInput, handleSkip}) => {


    return(
        <div className="guess-container">
            <input type="text" value={guess} onChange={handleInput}></input>
            <button onClick={handleSkip}>Skip</button>
        </div>
    )
}

export default GuessContainer;