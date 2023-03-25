import Template from '../components/ui/template';
import List from '../components/myRecipes/list';
import RecipeBrowser from "../components/myRecipes/recipeBrowser";
import {useState, useEffect, useCallback} from "react";
import useHttp from "../util/use-http";
import NewButton from "../components/myRecipes/newButton";
import SortAndFilter from "../components/myRecipes/sortAndFilter";
import {Box, Heading, Link, useToast, Text} from "@chakra-ui/react";
import {Link as ReactRouterLink, useParams} from "react-router-dom";
import CookbookTab from "../components/viewCookbook/cookbookTab";
import RecipesWithSortAndFilter from "../components/myRecipes/recipesWithSortAndFilter";


const MyRecipes = () => {
    const [allRecipes, setAllRecipes] = useState({recipes: []})
    const [cookbooks, setCookbooks] = useState({cookbooks: []})
    const {isLoading, error, sendRequest} = useHttp()
    const toast = useToast()

    //Get recipes from server
    useEffect(() => {
        sendRequest({
            url: `${process.env.REACT_APP_SERVER_URL}/user/myRecipes`,
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }, response => {
            if (!error) {
                const cookbookRecipes = [].concat.apply([], response.cookbooks.map(c => c.recipes))
                const allRecipesResponse = response.recipes.concat(cookbookRecipes)
                    .filter((v, i, a) => i === a.findIndex(t => (t._id === v._id)))

                setAllRecipes({recipes: allRecipesResponse})
                setCookbooks({cookbooks: response.cookbooks})

            }
        })
    }, [error, sendRequest, setAllRecipes])


    useEffect(() => {
        if (error) {
            toast({
                title: "Error",
                description: "Something went wrong",
                status: "error",
                duration: 5000,
                isClosable: true,
            })
        }
    }, [error, toast])


    const recipeTabContent = (
        <RecipesWithSortAndFilter recipes={allRecipes.recipes} isLoading={isLoading}/>
    )


        const cookbookTabContent = (
            <List items={cookbooks?.cookbooks} type={"cookbook"}/>)


    return (
        <Template>
            <RecipeBrowser
                recipeTabContent={recipeTabContent}
                cookbookTabContent={cookbookTabContent}
                defaultIndex={0}
                showFavorites={true}
            >
                <NewButton/>
            </RecipeBrowser>
        </Template>
    )

}

export default MyRecipes