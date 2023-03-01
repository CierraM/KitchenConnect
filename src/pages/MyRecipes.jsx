import Template from '../components/ui/template';
import SearchBar from '../components/ui/searchBar';
import List from '../components/myRecipes/List';
import FilterSection from "../components/myRecipes/filterButton";
import RecipeBrowser from "../components/myRecipes/recipeBrowser";
import {useState, useEffect} from "react";
import useHttp from "../util/use-http";
import NewButton from "../components/myRecipes/newButton";


const MyRecipes = () => {
    const [recipes, setRecipes] = useState({})
    const [cookbooks, setCookbooks] = useState({})
    const {isLoading, error, sendRequest} = useHttp()

    //Get recipes from server
    useEffect(() => {
        sendRequest({
            url: `${process.env.REACT_APP_SERVER_URL}/user/myRecipes`,
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }, response => {
            if (!error) {
                const cookbookRecipes = [].concat.apply([], response.cookbooks.map(c => c.recipes))
                const allRecipes = response.recipes.concat(cookbookRecipes)
                    .filter((v, i, a) => i === a.findIndex(t => (t._id === v._id)))
                setRecipes({recipes: allRecipes})
                setCookbooks({cookbooks: response.cookbooks})
            }
        })
    }, [error, sendRequest, setRecipes])

    const recipeTabContent = (
        <>
            <FilterSection></FilterSection>
            <List items={recipes?.recipes} type={"recipe"}/>
        </>
    )

    const cookbookTabContent = (
        <List items={cookbooks?.cookbooks} type={"cookbook"}/>
    )
    return (
        <Template>
            <RecipeBrowser recipeTabContent={recipeTabContent} cookbookTabContent={cookbookTabContent} defaultIndex={0}>
                <NewButton/>
            </RecipeBrowser>
        </Template>
    )

}

export default MyRecipes