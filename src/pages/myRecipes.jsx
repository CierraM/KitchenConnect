import Template from '../components/ui/template';
import List from '../components/myRecipes/list';
import RecipeBrowser from "../components/myRecipes/recipeBrowser";
import {useState, useEffect, useCallback} from "react";
import useHttp from "../util/use-http";
import NewButton from "../components/myRecipes/newButton";
import SortAndFilter from "../components/myRecipes/sortAndFilter";
import {Box, Heading, Link, useToast, Text} from "@chakra-ui/react";
import {Link as ReactRouterLink} from "react-router-dom";


const MyRecipes = () => {
    const [allRecipes, setAllRecipes] = useState({recipes: []})
    const [cookbooks, setCookbooks] = useState({cookbooks: []})
    const {isLoading, error, sendRequest} = useHttp()
    const [tags, setTags] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState({recipes: []})
    const [displayRecipes, setDisplayRecipes] = useState([{heading: '', recipes: []}])
    const [sortType, setSortType] = useState("asc")
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

                setFilteredRecipes({recipes: allRecipesResponse})
                setTags(allRecipesResponse.slice().flatMap(r => r.tags.map(t => t.toLowerCase().trim()))
                    .filter((v, i, a) => a.indexOf(v) === i))
            }
        })
    }, [error, sendRequest, setAllRecipes])

    useEffect(() => {
        let sortedRecipes = []
        const alphabet = [...Array(26)].map((_, i) => String.fromCharCode(i + 97))
        switch (sortType) {
            case "asc":
                // sortedRecipes = [{
                //     heading: '',
                //     recipes: filteredRecipes.recipes?.sort((a, b) => a?.title.toLowerCase().localeCompare(b?.title.toLowerCase()))
                // }]
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
                // sortedRecipes = [{
                //     heading: '',
                //     recipes: filteredRecipes.recipes?.sort((a, b) => a.title.toLowerCase().localeCompare(b?.title.toLowerCase()))
                //         .reverse()
                // }]
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
        <>
            <SortAndFilter tags={tags} filterHandler={filterDisplayRecipesByTags} sortHandler={setSortType}/>
            {isLoading && <p>Loading...</p>}
            {displayRecipes.length === 0 && <Text>
                No recipes yet! <Link as={ReactRouterLink} to={'/createRecipe'} textDecoration={'underline'} color={'blue'}>Create a new recipe.</Link>
            </Text>}
            {displayRecipes.map((r, index) => {
                return (
                    <Box key={index} mb={4}>
                        <Heading color={"main.500"} fontSize="lg">{r.heading}</Heading>
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