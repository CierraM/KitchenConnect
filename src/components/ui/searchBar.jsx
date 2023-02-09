import {Input, InputGroup, InputLeftAddon, Stack} from "@chakra-ui/react";
import {SearchIcon} from "@chakra-ui/icons";

const SearchBar = () => {
    return (
        <Stack spacing={4} w="full">
            <InputGroup >
                <InputLeftAddon children={<SearchIcon/>} />
                <Input placeholder='Search' />
            </InputGroup>
        </Stack>
    )
}

export default SearchBar