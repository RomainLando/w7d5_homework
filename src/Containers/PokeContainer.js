import Header from "../Components/Header";
import FilterContainer from "../Components/FilterContainer";
import PokemonImage from "../Components/PokemonImage";
import PokemonTitle from "../Components/PokemonTitle";
import SelectContainer from "../Components/SelectContainer";
import GuessContainer from "../Components/GuessContainer";
import { useEffect, useState } from "react";
import PokemonDesc from "../Components/PokemonDesc";


const  PokeContainer = () => {

    const [isPokedex, setIsPokedex] = useState(true);
    const [pokemonList, setPokemonList] = useState("");
    const [pokemonID, setPokemonID] = useState(1);
    const [pokemon, setPokemon] = useState("");
    const [species, setSpecies] = useState("");
    const [pokePic, setPokePic] = useState("");
    const [pokeName, setPokeName] = useState("");
    const [pokeTypes, setPokeTypes] = useState([]);
    const [pokeDesc, setPokeDesc] = useState("");



    useEffect(() => {
        getAllPokemon(pokemonID);
    }, [])


    useEffect(() => {
        getPokemon(pokemonID);
        getSpecies(pokemonID);
    }, [pokemonID])


    const getAllPokemon = () => {
        fetch("https://pokeapi.co/api/v2/pokemon/?limit=1154")
        .then((response) => response.json())
        .then((data) => {
            setPokemonList(data.results);
        })
    }


    const getPokemon = (id) => {
        fetch("https://pokeapi.co/api/v2/pokemon/"+id+"/")
        .then((response) => response.json())
        .then((data) => {
            setPokeName(data.name)
            setPokePic(data.sprites.other["dream_world"]["front_default"]);
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


    return(
        <div className="pokemon-container">
            <Header />
            <FilterContainer />
            <div className="pokemon">
                <PokemonImage pokePic={pokePic}/>
                <div className="description">
                    <PokemonTitle pokeName={pokeName} pokemonID={pokemonID}/>
                    <PokemonDesc pokeDesc={pokeDesc} pokeTypes={pokeTypes} />
                </div>
            </div>
            <SelectContainer />
            <GuessContainer />
        </div>
        
    );
}

export default PokeContainer;