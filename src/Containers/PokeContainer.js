import Header from "../Components/Header";
import FilterContainer from "../Components/FilterContainer";
import PokemonImage from "../Components/PokemonImage";
import PokemonTitle from "../Components/PokemonTitle";
import SelectContainer from "../Components/SelectContainer";
import GuessContainer from "../Components/GuessContainer";
import { useEffect, useState } from "react";
import PokemonDesc from "../Components/PokemonDesc";
import "./PokeContainer.css";


const  PokeContainer = () => {


    const [generations, setGenerations] = useState([
        {name:"Gen I", start:0, end:151},
        {name:"Gen II", start:151, end:100},
        {name:"Gen III", start:251, end:135},
        {name:"Gen IV", start:386, end:107},
        {name:"Gen V", start:495, end:156},
        {name:"Gen VI", start:649, end:72},
        {name:"Gen VII", start:721, end:88},
        {name:"Gen VIII", start:809, end:96},
        {name:"All", start:0, end:905},
    ]);
    const [pokedexMode, setPokedexMode] = useState(true);
    const [pokemonList, setPokemonList] = useState("");
    const [pokemonID, setPokemonID] = useState(1);
    const [pokePic, setPokePic] = useState("");
    const [pokeName, setPokeName] = useState(null);
    const [pokeTypes, setPokeTypes] = useState([]);
    const [pokeDesc, setPokeDesc] = useState("");
    const [generation, setGeneration] = useState({name:"All", start:0, end:905},)
    const [guess, setGuess] = useState("");


    useEffect(() => {
        getAllPokemon();
    }, [generation])


    useEffect(() => {
        getPokemon(pokemonID);
        getSpecies(pokemonID);
        const select_box = document.getElementById("myselectbox");
        if (select_box) {
        select_box.selectedIndex = pokemonID;
        }
        
    }, [pokemonID])

    useEffect(() => {
        if (guess === pokeName) {
            randomID();
            setGuess("");
        }
    }, [guess])


    const getAllPokemon = () => {
        fetch("https://pokeapi.co/api/v2/pokemon/?offset="+generation.start+"&limit="+generation.end)
        .then((response) => response.json())
        .then((data) => {
            setPokemonList(data.results.map((element) => {
                return(element.name)
            }));
            setPokemonID(data.results[0].url.substr(34).slice(0,-1))
        })
    }


    const getPokemon = (id) => {
        fetch("https://pokeapi.co/api/v2/pokemon/"+id+"/")
        .then((response) => response.json())
        .then((data) => {
            setPokeName(data.name);
            setPokePic(data.sprites.other["official-artwork"]["front_default"]);
            setPokeTypes(data.types.map((element) => {
                return(element.type.name);
            }));
        })
    }


    const getSpecies = (id) => {
        fetch("https://pokeapi.co/api/v2/pokemon-species/"+id+"/")
        .then((response) => response.json())
        .then((data) => {
            setPokeDesc(data.flavor_text_entries[0].flavor_text)
        })
    }


    const handleSelected = (evt) => {
        setPokemonID(evt.target.value);
        const select_box = document.getElementById("myselectbox");
        select_box.selectedIndex = pokemonID;

    }


    const handlebuttonClick = (value) => {
        setPokemonID(+pokemonID+value);
    }


    const filterChange = (evt) => {
        setGeneration(generations[evt.target.id]);
        
    }

    const handleModeSwitch = () => {
        if (pokedexMode) {
            setPokedexMode(false);
        } else {
            setPokedexMode(true);
        }
    }

    const handleInput = (evt) => {
        setGuess(evt.target.value);
    }

    const randomID = () => {
        const num = Math.floor((Math.random() * (generation.end))+generation.start+1);
        setPokemonID(num);
    }


    const handleSkip = () => {
        randomID();
        const guessInput = document.getElementById("guess-input");
        guessInput.innerText = "";
    }


    return(
        <div className="pokemon-container">
            <Header pokedexMode={pokedexMode} handleModeSwitch={handleModeSwitch}/>
            <FilterContainer generations={generations} filterChange={filterChange}/>
            <div className="pokemon">
                <PokemonImage pokePic={pokePic} pokedexMode={pokedexMode}/>
                <div className="description">
                    <PokemonTitle pokeName={pokeName} pokemonID={pokemonID} pokedexMode={pokedexMode}/>
                    <PokemonDesc pokeDesc={pokeDesc} pokeTypes={pokeTypes} />
                </div>
            </div>
            { pokedexMode ?
            <SelectContainer pokemonList={pokemonList}
            generation={generation}
            handleSelected={handleSelected}
            handlebuttonClick={handlebuttonClick}
            pokemonID={pokemonID}/> :
            <GuessContainer guess={guess}
            handleInput={handleInput}
            handleSkip={handleSkip}/>
            }
        </div>
        
    );
}

export default PokeContainer;