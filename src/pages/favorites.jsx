import Template from "../components/ui/template";
import {Flex, Heading, Link, Spinner, useToast} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import useHttp from "../util/use-http";
import RecipeCard from "../components/myRecipes/recipeCard";
import List from "../components/myRecipes/list";
import {Link as ReactRouterLink} from "react-router-dom";
import {ArrowBackIcon} from "@chakra-ui/icons";


const Favorites = () => {
    const {isLoading, error, sendRequest} = useHttp()
    const [favorites, setFavorites] = useState({favorites: []})
    const toast = useToast()

    useEffect(() => {
        sendRequest({
            url: `${process.env.REACT_APP_SERVER_URL}/user/favorites`,
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }, result => {
            setFavorites({favorites: result.favorites})
        })
    }, [sendRequest, setFavorites])

    useEffect(() => {
        if (error) {
            toast({
                title: "An error occurred.",
                description: "Please try again.",
                status: "error",
                duration: 9000,
                isClosable: true,
            })
        }
    })
    return <Template>
        {isLoading && <Spinner/>}
        <Flex py={3} alignItems={"center"}>
            <Link aria-label={'back'} as={ReactRouterLink} to="../"><ArrowBackIcon/> Back </Link>
            <Heading pl={3}>Favorites</Heading>
        </Flex>
        <List items={favorites.favorites} type={"recipe"}/>
    </Template>
}

export default Favorites