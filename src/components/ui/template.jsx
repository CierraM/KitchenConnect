import {Box, Flex, HStack, Link, Spacer, StackDivider, Tag, VStack, Wrap, WrapItem} from "@chakra-ui/react"
import Menu from "../menu/menu"
import SearchBar from "./searchBar"
import {useEffect, useState} from "react";
import useHttp from "../../util/use-http";
import {Link as ReactRouterLink} from 'react-router-dom';
import {useAtom} from "jotai";
import {userTokenAtom} from "../../store/atoms";

const Template = ({children}) => {
    const [recipes, setRecipes] = useState({})
    const {isLoading, error, sendRequest} = useHttp()
    const [filteredRecipes, setFilteredRecipes] = useState([])
    const [userToken, setUserToken] = useAtom(userTokenAtom)

    //Get recipes from server
    useEffect(() => {

        if (userToken) {
            sendRequest({
                url: `${process.env.REACT_APP_SERVER_URL}/user/myRecipes`,
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            }, response => {
                if (!error) {
                    const cookbookRecipes = [].concat.apply([], response.cookbooks.map(c => c.recipes))
                    const allRecipes = response.recipes.concat(cookbookRecipes)
                        .filter((v, i, a) => i === a.findIndex(t => (t._id === v._id)))
                    setRecipes(allRecipes)
                }
            })
        }
    }, [error, sendRequest])

    const searchHandler = (e, searchInput) => {
        if (searchInput.length === 0) {
            setFilteredRecipes([])
            return;
        }
        e.preventDefault()
        const filter = searchInput.toLowerCase()
        const filtered = recipes.filter(recipe => {
            return (
                recipe.title.toLowerCase().includes(filter) ||
                recipe.tags.includes(filter) ||
                recipe.description.toLowerCase().includes(filter) ||
                recipe.ingredients.includes(filter)
            )
        })
        setFilteredRecipes(filtered)
    }

    return (
        <Flex p={3} h={"100%"} minH={"100vh"} flexDir={"column"}>
            <HStack align="top" p={3}>
                <Menu/>
                <Flex w={"full"} flexDirection={"column"}>
                    <SearchBar searchHandler={searchHandler}/>
                    <Box position={"relative"}>
                        {filteredRecipes.length > 0 && (
                            <VStack
                                position={"absolute"}
                                w={"full"}
                                background={"white"}
                                zIndex={5}
                                py={3}
                                divider={<StackDivider borderColor='gray.200'/>}
                                spacing={4}
                                align='stretch'
                                shadow={'md'}
                            >
                                {filteredRecipes.map((recipe, key) => {
                                    return (
                                        <Link
                                            px={3}
                                            key={key}
                                            as={ReactRouterLink}
                                            to={`/recipe/${recipe._id}`}
                                            _hover={{
                                                textDecoration: "none",
                                                fontWeight: "bold"
                                            }}
                                            onClick={() => {
                                                setFilteredRecipes([])
                                            }}
                                        >
                                            {recipe.title}
                                            <Wrap my={1}>
                                                {recipe.tags.map((tag, index) => {
                                                    return <WrapItem key={index}><Tag>{tag}</Tag></WrapItem>
                                                })}

                                            </Wrap>
                                        </Link>
                                    )
                                })}
                            </VStack>
                        )}
                    </Box>
                </Flex>
            </HStack>
            <Box flexGrow={1} h={"full"}>
                {children}
            </Box>
        </Flex>
    )
}

export default Template