import {Input, InputGroup, InputLeftAddon, Stack} from "@chakra-ui/react";
import {SearchIcon} from "@chakra-ui/icons";
import {useState} from "react";

const SearchBar = ({searchHandler}) => {


    const [searchInput, updateSearchInput] = useState('')

    return (
            <Stack spacing={4} w="full">
                <form onSubmit={(e) => {searchHandler(e, searchInput)}}>
                    <InputGroup colorScheme="primary">
                        <InputLeftAddon children={<SearchIcon/>} variant={"outline"} />
                        <Input placeholder='Search' value={searchInput} onChange={(e) => {
                            updateSearchInput(e.target.value)
                            searchHandler(e, e.target.value)
                        }}/>
                    </InputGroup>
                </form>
            </Stack>

    )
}

export default SearchBar