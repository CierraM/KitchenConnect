import {HStack} from "@chakra-ui/react";
import SortButton from "./sortButton";
import FilterSection from "./filterButton";

const SortAndFilter = () => {
    return (
        <HStack py={3}>
            <SortButton />
            <FilterSection/>
        </HStack>
    )
}

export default SortAndFilter