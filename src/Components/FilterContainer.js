import FilterOption from "./FilterOption";

const FilterContainer = ({generations, filterChange}) => {

    const generationOptions = generations.map((element, index) => {
        return <FilterOption key={+index} 
        id={+index} 
        generation={element.name}
        filterChange={filterChange} ></FilterOption>
    })


    return(
        <div className="filters">
            {generationOptions}
        </div>
    )
}

export default FilterContainer;