import Template from "../components/ui/template";
import {useParams} from "react-router-dom";
import useHttp from "../util/use-http";
import {useEffect, useState} from "react";
import {Flex, Heading, Spinner} from '@chakra-ui/react'
import ViewRecipeHeader from "../components/viewRecipe/viewRecipeHeader";
import ViewRecipeTitle from "../components/viewRecipe/viewRecipeTitle";
import RecipeBody from "../components/viewRecipe/recipeBody";

const ViewRecipe = () => {

    const {id} = useParams()
    const {isLoading, error, sendRequest} = useHttp()
    const [recipe, setRecipe] = useState({})

    const getRelatedRecipe = () => {

    }

    //Get recipe
    useEffect(() => {
        sendRequest({
            url: `${process.env.REACT_APP_SERVER_URL}/recipe/${id}`,
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }, response => {
            if (!error) {
                setRecipe(response.recipe)
            }
        })
    }, [error, id, sendRequest])

    if (isLoading) {
        return (
            <Template>
                <Flex mt={3} justify={"center"}>
                    <Spinner/>
                </Flex>
            </Template>
        )
    }
    return (
        <Template>
            <ViewRecipeHeader isFavorite={recipe.isFavorite}/>
            <ViewRecipeTitle title={recipe.title} id={id}/>
            <RecipeBody recipe={recipe}/>

        </Template>
    )

}

export default ViewRecipe