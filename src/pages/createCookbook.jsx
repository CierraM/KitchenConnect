import Template from "../components/ui/template";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Heading,
    Input,
    InputGroup,
    InputLeftElement, Text, useToast,
    Wrap
} from "@chakra-ui/react";
import {useEffect, useState, useRef} from "react";
import useHttp from "../util/use-http";
import {useNavigate, useParams} from "react-router-dom";
import RelatedRecipeTag from "../components/createRecipe/relatedRecipeTag";
import {Search2Icon} from "@chakra-ui/icons";

const CreateCookbook = ({editing}) => {
    const [recipes, setRecipes] = useState();
    const {isLoading, error, sendRequest} = useHttp();
    const navigate = useNavigate();
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const {id} = useParams()
    const toast = useToast()

    const titleInputRef = useRef();
    const [relatedRecipes, setRelatedRecipes] = useState([]);

    useEffect(() => {
        if (error) {
            toast({
                title: "An error occurred.",
                description: error,
                status: "error",
                duration: 9000,
                isClosable: true,
            })
        }
    })

    useEffect(() => {

        if (editing) {
            sendRequest({
                url: `${process.env.REACT_APP_SERVER_URL}/cookbook/${id}`,
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            }, (result) => {
                if (!error) {
                    const cookbook = result.cookbook;

                    titleInputRef.current.value = cookbook.title || '';
                    setRelatedRecipes(cookbook.recipes)
                }
            })
        }
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
                setFilteredRecipes(allRecipes)
            }
        })
    }, [error, sendRequest])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (editing) {
            sendRequest({
                url: `${process.env.REACT_APP_SERVER_URL}/cookbook/update`,
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: {
                    cookbookId: id,
                    changes: {
                        title: titleInputRef.current.value,
                        recipes: relatedRecipes.map(r => r._id)
                    }
                }
            }, (result) => {
                if (!error) {
                    navigate(`/cookbook/${id}`)
                    toast({
                        title: "Cookbook updated.",
                        description: "Your cookbook has been updated.",
                        status: "success",
                        duration: 9000,
                        isClosable: true,
                    })
                }
            })
        } else {
            sendRequest({
                url: `${process.env.REACT_APP_SERVER_URL}/cookbook/create`,
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: {
                    title: titleInputRef.current.value,
                    recipes: relatedRecipes.map(r => r._id)
                }
            }, (result) => {
                if (!error) {
                    navigate('/')
                    toast({
                        title: "Cookbook created.",
                        description: "Your cookbook has been created.",
                        status: "success",
                        duration: 9000,
                        isClosable: true,
                    })
                }
            })
        }
    }

    const handleSearch = (e) => {
        const searchValue = e.target.value;
        if (!searchValue) {
            setFilteredRecipes([]);
            return;
        }
        const filtered = recipes.filter((r) => {
            return (r.title.toLowerCase().includes(searchValue.toLowerCase()) || r.tags?.includes(searchValue))
        })
        setFilteredRecipes(filtered)
    }

    const toggleRelatedRecipeSelect = (recipe) => {
        let temp = relatedRecipes.slice(0);
        if (temp.map(r => r._id).includes(recipe._id)) {
            setRelatedRecipes(temp.filter(r => r._id !== recipe._id))
            return;
        } else {
            temp.push(recipe);
        }
        setRelatedRecipes(temp);
    }

    return (
        <Template>
            <Box p={3}>
                <Heading>{editing ? "Update Cookbook" : "Create Cookbook"}</Heading>
                <form onSubmit={handleSubmit}>
                    <FormControl mb={2}>
                        <FormLabel mb={0}>Title</FormLabel>
                        <Input type={"text"} ref={titleInputRef}/>
                    </FormControl>
                    <FormControl mb={2} mt={4}>
                        <FormLabel mb={0}>Add Recipes</FormLabel>
                        <Wrap my={relatedRecipes.length > 0 && 3}>
                            {relatedRecipes.map((recipe, index) => {
                                return <RelatedRecipeTag key={index} recipe={recipe} relatedRecipes={relatedRecipes}
                                                         clickHandler={toggleRelatedRecipeSelect}/>
                            })}
                        </Wrap>
                        <InputGroup>
                            <Input placeholder="search for a recipe to link" onChange={handleSearch}
                                   borderRadius={"none"}/>
                            <InputLeftElement children={<Search2Icon/>}/>
                        </InputGroup>
                        <Wrap border={"1px solid lightgrey"} p={3}>
                            {filteredRecipes.length == 0 && <Text>Nothing to show</Text>}
                            {filteredRecipes.map((recipe, index) => {
                                return (
                                    <RelatedRecipeTag key={index} recipe={recipe}
                                                      clickHandler={toggleRelatedRecipeSelect}
                                                      relatedRecipes={relatedRecipes}/>
                                )
                            })}
                        </Wrap>
                    </FormControl>
                    <Button type={"submit"} colorScheme="blue"
                            disabled={isLoading}>{editing ? "Update Cookbook" : "Create Cookbook"}</Button>
                    <Button type="button" colorScheme="red" onClick={() => {
                        navigate(-1)
                    }}>Cancel</Button>
                </form>
            </Box>
        </Template>
    )
}

export default CreateCookbook