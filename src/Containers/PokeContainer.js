import Header from "../Components/Header";
import FilterContainer from "../Components/FilterContainer";
import PokemonImage from "../Components/PokemonImage";
import PokemonTitle from "../Components/PokemonTitle";
import SelectContainer from "../Components/SelectContainer";
import GuessContainer from "../Components/GuessContainer";
import { useEffect, useState } from "react";
import PokemonDesc from "../Components/PokemonDesc";


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
        {name:"All", start:0, end:904},
    ]);
    const [pokemonList, setPokemonList] = useState("");
    const [pokemonID, setPokemonID] = useState(1);
    const [pokePic, setPokePic] = useState("");
    const [pokeName, setPokeName] = useState("");
    const [pokeTypes, setPokeTypes] = useState([]);
    const [pokeDesc, setPokeDesc] = useState("");
    const [generation, setGeneration] = useState({name:"All", start:0, end:904},)


    useEffect(() => {
        getAllPokemon();
    }, [generation])


    useEffect(() => {
        getPokemon(pokemonID);
        getSpecies(pokemonID);
        const select_box = document.getElementById("myselectbox");
        select_box.selectedIndex = pokemonID;
    }, [pokemonID])


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


    return(
        <div className="pokemon-container">
            <Header />
            <FilterContainer generations={generations} filterChange={filterChange}/>
            <div className="pokemon">
                <PokemonImage pokePic={pokePic}/>
                <div className="description">
                    <PokemonTitle pokeName={pokeName} pokemonID={pokemonID}/>
                    <PokemonDesc pokeDesc={pokeDesc} pokeTypes={pokeTypes} />
                </div>
            </div>
            <SelectContainer pokemonList={pokemonList}
            generation={generation}
            handleSelected={handleSelected}
            handlebuttonClick={handlebuttonClick}
            pokemonID={pokemonID}/>
            <GuessContainer />
        </div>
        
    );
}

export default PokeContainer;