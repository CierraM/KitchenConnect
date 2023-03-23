import FilterSection from "../components/myRecipes/filterButton";
import List from "../components/myRecipes/list";
import Template from "../components/ui/template";
import RecipeBrowser from "../components/myRecipes/recipeBrowser";
import {useEffect, useState} from "react";
import useHttp from "../util/use-http";
import NewButton from "../components/myRecipes/newButton";
import {Spinner} from "@chakra-ui/react";

const Cookbooks = () => {
    const [recipes, setRecipes] = useState({})
    const {isLoading, error, sendRequest} = useHttp()

    useEffect(() => {
        sendRequest({
            url: `${process.env.REACT_APP_SERVER_URL}/user/myRecipes`,
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }, response => {
            if (!error) {
                setRecipes(response)
            }
        })
    }, [error, sendRequest])

    const recipeTabContent = (
        <>
            <FilterSection></FilterSection>
            <List items={recipes.recipes} type={"recipe"}/>
        </>
    )

    const cookbookTabContent = (
        <List items={recipes.cookbooks} type={"cookbook"}/>
    )
    return (
        <Template>
            {isLoading && <Spinner/>}
            <RecipeBrowser recipeTabContent={recipeTabContent} cookbookTabContent={cookbookTabContent} defaultIndex={1}>
                <NewButton/>
            </RecipeBrowser>
        </Template>
    )
}

export default Cookbooks