import {useEffect, useState} from "react";
import SortAndFilter from "./sortAndFilter";
import {Box, Heading, Link, Text} from "@chakra-ui/react";
import {Link as ReactRouterLink} from "react-router-dom";
import List from "./list";


const RecipesWithSortAndFilter = ({recipes, isLoading}) => {

    const [tags, setTags] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState({recipes: []})
    const [displayRecipes, setDisplayRecipes] = useState([{heading: '', recipes: []}])
    const [sortType, setSortType] = useState("asc")

    useEffect(() => {
        if (recipes) {
            setFilteredRecipes({recipes: recipes})
            setTags(recipes?.slice().flatMap(r => r.tags.map(t => t.toLowerCase().trim()))
                .filter((v, i, a) => a.indexOf(v) === i))
        }
    }, [recipes])

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
            setFilteredRecipes({recipes: recipes.slice()})
        } else {
            setFilteredRecipes({recipes: recipes.filter(r => r.tags.some(t => tags.includes(t.toLowerCase().trim())))})
        }
    }

    return <>
        <SortAndFilter tags={tags} filterHandler={filterDisplayRecipesByTags} sortHandler={setSortType}/>
        {isLoading && <p>Loading...</p>}
        {(displayRecipes.length === 0 && !isLoading) && <Text>
            No recipes yet! <Link as={ReactRouterLink} to={'/createRecipe'} textDecoration={'underline'} color={'blue'}>Create
            a new recipe.</Link>
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
}


export default RecipesWithSortAndFilter