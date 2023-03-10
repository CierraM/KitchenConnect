import Template from '../components/ui/template';
import SearchBar from '../components/ui/searchBar';
import List from '../components/myRecipes/list';
import RecipeBrowser from "../components/myRecipes/recipeBrowser";
import {useState, useEffect, useCallback} from "react";
import useHttp from "../util/use-http";
import NewButton from "../components/myRecipes/newButton";
import SortAndFilter from "../components/myRecipes/sortAndFilter";
import {Box, Heading} from "@chakra-ui/react";


const MyRecipes = () => {
    const [allRecipes, setAllRecipes] = useState({recipes: []})
    const [cookbooks, setCookbooks] = useState({cookbooks:[]})
    const {isLoading, error, sendRequest} = useHttp()
    const [tags, setTags] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState({recipes: []})
    const [displayRecipes, setDisplayRecipes] = useState([{heading: '', recipes: []}])
    const [sortType, setSortType] = useState("asc")

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

                setFilteredRecipes({recipes: allRecipesResponse})
                setTags(allRecipesResponse.slice().flatMap(r => r.tags.map(t => t.toLowerCase().trim()))
                    .filter((v, i, a) => a.indexOf(v) === i))
            }
        })
    }, [error, sendRequest, setAllRecipes])

    useEffect(() => {
            const alphabet = [...Array(26)].map((_, i) => String.fromCharCode(i + 97))
            let sortedRecipes = []
            switch (sortType) {
                case "asc":
                    sortedRecipes = alphabet.map(letter => {
                        const letterRecipes = filteredRecipes.recipes?.filter(r => r.title.toLowerCase().startsWith(letter))
                        letterRecipes.sort((a, b) => a.title.localeCompare(b.title))
                        return {
                            heading: letter.toUpperCase(),
                            recipes: letterRecipes
                        }
                    }).filter(r => r.recipes.length > 0)
                    break;
                case "desc":
                    sortedRecipes = alphabet.map(letter => {
                        const letterRecipes = filteredRecipes.recipes?.filter(r => r.title.toLowerCase().startsWith(letter))
                            .sort((a, b) => a.title.localeCompare(b.title))
                            .reverse()
                        return {
                            heading: letter.toUpperCase(),
                            recipes: letterRecipes

                        }
                    }).filter(r => r.recipes?.length > 0).reverse()

                    break;
                case "tagsDesc":
                    sortedRecipes = tags.map(tag => {
                        return {
                            heading: tag,
                            recipes: filteredRecipes.recipes?.filter(r => r.tags.includes(tag))
                                .sort((a, b) => a.title.localeCompare(b.title))
                        }
                    }).filter(r => r.recipes?.length > 0)
                    break;
                case "tagsAsc":
                    sortedRecipes = tags.map(tag => {
                        return {
                            heading: tag,
                            recipes: filteredRecipes.recipes?.filter(r => r.tags.includes(tag))
                                .sort((a, b) => a.title.localeCompare(b.title)).reverse()
                        }
                    }).filter(r => r.recipes?.length > 0).reverse()
                    break;
                default:
                    break;
            }
            setDisplayRecipes(sortedRecipes)
    }, [sortType, filteredRecipes])


    const filterDisplayRecipesByTags = (tags) => {
        if (tags.length === 0) {
            setFilteredRecipes({recipes: allRecipes.recipes.slice()})
        } else {
            setFilteredRecipes({recipes: allRecipes.recipes.filter(r => r.tags.some(t => tags.includes(t.toLowerCase().trim())))})
        }
    }


    const recipeTabContent = (
        <>
            <SortAndFilter tags={tags} filterHandler={filterDisplayRecipesByTags} sortHandler={setSortType}/>
            {displayRecipes.map((r, index) => {
                return (
                    <Box key={index}>
                        <Heading>{r.heading}</Heading>
                        <List items={r.recipes} type={"recipe"}/>
                    </Box>
                )
            })}
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