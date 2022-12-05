import "./SelectContainer.css";

const SelectContainer = ({pokemonList, handleSelected, pokemonID, handlebuttonClick, generation}) => {

    const pokemonOptions = (pokemonList) ? pokemonList.map((element, index) => {
        return <option value={generation.start+index+1} key={index+1}>{element}</option>
    }) : null;

    const handlePrev = () => {
        if (+pokemonID>+generation.start+1) {
            handlebuttonClick(-1);
        }
    }

    const handleNext = () => {
        if (+pokemonID<+generation.end+generation.start) {
            handlebuttonClick(+1);
        }
    }

    return(
        <div className="select-container">
        <button onClick={handlePrev}>Prev</button>
        <select id="myselectbox" value={pokemonID} onChange={handleSelected}>
            {pokemonOptions}
        </select>
        <button onClick={handleNext}>Next</button>
        </div>
        

    )
}

export default SelectContainer;