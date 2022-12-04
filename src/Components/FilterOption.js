const FilterOption = ({generation, id, filterChange}) => {

    return(
        <button id={id} onClick={filterChange}>{generation}</button>
    )
}

export default FilterOption;