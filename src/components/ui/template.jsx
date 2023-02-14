import {Box, Flex, HStack, Spacer} from "@chakra-ui/react"
import Menu from "../menu/menu"
import SearchBar from "./searchBar"

const Template = ({ children }) => {
    return (
        <Box p={3} h={"100%"}>
            <HStack align="center">
                <Menu />
                <SearchBar/>
            </HStack>
            {children}
        </Box>
    )
}

export default Template