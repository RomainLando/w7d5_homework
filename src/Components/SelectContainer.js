const SelectContainer = ({pokemonList, handleSelected, pokemonID, handlebuttonClick, generation}) => {

    const pokemonOptions = (pokemonList) ? pokemonList.map((element, index) => {
        return <option value={generation.start+index+1} key={index+1}>{element}</option>
    }) : null;

    const handlePrev = () => {
        if (pokemonID>1) {
            handlebuttonClick(-1);
        }
    }

    const handleNext = () => {
        if (pokemonID<905) {
            handlebuttonClick(+1);
        }
    }

    return(
        <>
        <button onClick={handlePrev}>Prev</button>
        <select id="myselectbox" value={pokemonID} onChange={handleSelected}>
            {pokemonOptions}
        </select>
        <button onClick={handleNext}>Next</button>
        </>
        

    )
}

export default SelectContainer;