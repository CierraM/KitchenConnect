import {Box, Input, InputGroup, InputLeftAddon, Stack, StackDivider, VStack} from "@chakra-ui/react";
import {SearchIcon} from "@chakra-ui/icons";
import {useEffect, useRef, useState} from "react";
import useHttp from "../../util/use-http";

const SearchBar = ({searchHandler}) => {


    const [searchInput, updateSearchInput] = useState('')

    return (
            <Stack spacing={4} w="full">
                <form onSubmit={(e) => {searchHandler(e, searchInput)}}>
                    <InputGroup>
                        <InputLeftAddon children={<SearchIcon/>}/>
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