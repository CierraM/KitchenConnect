import {Flex} from "@chakra-ui/react";
import SortButton from "./sortButton";
import FilterSection from "./filterButton";


const SortAndFilter = ({tags, sortHandler, filterHandler}) => {
    return (
        <Flex alignItems={"flex-start"} justify={"space-between"}>
            <FilterSection tags={tags} filterHandler={filterHandler}/>
            <SortButton sortHandler={sortHandler}/>
        </Flex>
    )
}

export default SortAndFilter