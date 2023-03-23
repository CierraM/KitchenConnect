import Template from "../components/ui/template";
import {
    FormControl,
    FormLabel,
    FormHelperText,
    Input,
    Box,
    Heading,
    Textarea,
    Switch,
    Flex,
    Button,
    Checkbox,
    CheckboxGroup,
    Wrap,
    InputGroup,
    InputLeftElement, Text, useToast, SimpleGrid, Spinner
} from '@chakra-ui/react'
import Ingredients from "../components/createRecipe/ingredients/ingredients";
import Steps from "../components/createRecipe/steps/steps";
import Tags from "../components/createRecipe/tags/tags";
import {useRef, useState} from "react";
import useHttp from "../util/use-http";
import {useEffect} from "react";
import RelatedRecipeTag from "../components/createRecipe/relatedRecipeTag";
import {Search2Icon} from "@chakra-ui/icons";
import {useNavigate, useParams} from "react-router-dom";

const CreateRecipe = ({editing}) => {
    //TODO: handle private recipes when that feature is ready
    const titleInputRef = useRef();
    const descriptionInputRef = useRef();
    const [ingredients, setIngredients] = useState({ingredients: []});
    const [steps, setSteps] = useState({steps: []});
    const notesRef = useRef();
    // const privateRef = useRef();
    const [tags, setTags] = useState({tags: []});
    const [selectedCookbooks, setSelectedCookbooks] = useState();
    const [relatedRecipes, setRelatedRecipes] = useState([])

    const [cookbooks, setCookbooks] = useState([])
    const [recipes, setRecipes] = useState([])
    const [filteredRecipes, setFilteredRecipes] = useState(recipes);

    const navigate = useNavigate();
    const {isLoading, error, sendRequest} = useHttp()
    const {id} = useParams()
    const toast = useToast()

    useEffect(() => {
        sendRequest({
            url: `${process.env.REACT_APP_SERVER_URL}/user/myRecipes`,
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }, response => {
            if (!error) {
                setCookbooks(response.cookbooks)
                const cookbookRecipes = [].concat.apply([], response.cookbooks.map(c => c.recipes))
                const allRecipes = response.recipes.concat(cookbookRecipes)
                    .filter((v, i, a) => i === a.findIndex(t => (t._id === v._id)))
                setRecipes(allRecipes)
            }
        })
    }, [error, sendRequest])

    useEffect(() => {
        if (editing) {
            sendRequest({
                url: `${process.env.REACT_APP_SERVER_URL}/recipe/${id}`,
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            }, (result) => {
                if (!error) {
                    const recipe = result.recipe;

                    titleInputRef.current.value = recipe.title || '';
                    descriptionInputRef.current.value = recipe.description || '';
                    setIngredients({ingredients: recipe.ingredients})
                    const recipeSteps = recipe.steps.sort((a, b) => a.ordinal < b.ordinal).map(s => s.text)
                    setSteps({steps: recipeSteps})
                    notesRef.current.value = recipe.notes || '';
                    setTags({tags: recipe.tags})
                    setSelectedCookbooks(recipe.cookbookIds)
                    setRelatedRecipes(recipe.related)
                }
            })
        }
    }, [editing, id])

    const handleSubmit = (e) => {
        e.preventDefault()
        const request = {
            title: titleInputRef.current.value,
            description: descriptionInputRef.current.value,
            ingredients: ingredients.ingredients,
            steps: steps.steps.map((s, index) => {
                return {
                    ordinal: index + 1,
                    text: s
                }
            }),
            notes: notesRef.current.value,
            cookbookIds: selectedCookbooks,
            tags: tags.tags,
            related: relatedRecipes.map(r => r._id)
        }

        if (editing) {
            const updateRequest = {
                recipeId: id,
                changes: request
            }
            sendRequest({
                url: `${process.env.REACT_APP_SERVER_URL}/recipe/update`,
                method: 'PATCH',
                body: updateRequest,
                headers: {'Content-Type': 'application/json'}
            }, (result) => {
                if (!error) {
                    navigate(`/recipe/${id}`)
                }
            })
        } else {
            sendRequest({
                url: `${process.env.REACT_APP_SERVER_URL}/recipe/create`,
                method: 'POST',
                body: request,
                headers: {'Content-Type': 'application/json'}
            }, (result) => {
                if (!error) {
                    navigate(`/recipe/${result._id}`)
                }
            })

        }

    }

    const addTag = (tag) => {
        if (!tag) {
            return;
        }
        let temp = tags.tags;
        temp.push(tag)
        setTags({tags: temp})
    }

    const removeTag = (tag) => {
        let temp = tags.tags;
        let result = [];
        temp.forEach(i => {
            if (i !== tag) {
                result.push(i)
            }
        })
        setTags({tags: result})
    }

    const addIngredient = (ingredient) => {
        if (!ingredient) {
            return;
        }
        let temp = ingredients.ingredients;
        temp.push(ingredient)
        setIngredients({ingredients: temp})
    }

    const removeIngredient = (ingredient) => {
        let temp = ingredients.ingredients;
        let result = [];
        temp.forEach(i => {
            if (i !== ingredient) {
                result.push(i)
            }
        })
        setIngredients({ingredients: result})
    }

    const editIngredient =  (ingredient, index) => {
        let temp = ingredients.ingredients;
        temp[index] = ingredient
        setIngredients({ingredients: temp})
    }

    const editStep = (step, index) => {
        let temp = steps.steps;
        temp[index] = step
        setSteps({steps: temp})
    }

    const addStep = (step) => {
        if (!step) {
            return;
        }
        let temp = steps.steps;
        temp.push(step)
        setSteps({steps: temp})
    }

    const removeStep = (step) => {
        console.log(step)
        let temp = steps.steps;
        let result = [];
        temp.forEach(i => {
            if (i !== step) {
                result.push(i)
            }
        })
        setSteps({steps: result})
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

    return (
        <Template>
            {isLoading && <Spinner/>}
            <Box p={3}>
                <Heading>{editing ? 'Edit Recipe' : 'New Recipe'}</Heading>
                <form onSubmit={handleSubmit}>
                    <FormControl mb={2}>
                        <FormLabel mb={0}>Title</FormLabel>
                        <Input type={"text"} ref={titleInputRef}/>
                    </FormControl>

                    <FormControl mb={2}>
                        <FormLabel mb={0}>Description</FormLabel>
                        <Textarea ref={descriptionInputRef}/>
                    </FormControl>

                    <FormControl mb={2}>
                        <FormLabel mb={0}>Ingredients</FormLabel>
                        <Ingredients addIngredient={addIngredient} removeIngredient={removeIngredient}
                                     ingredients={ingredients.ingredients} editIngredient={editIngredient}/>
                    </FormControl>

                    <FormControl mb={2}>
                        <FormLabel mb={0}>Steps</FormLabel>
                        <Steps addStep={addStep} removeStep={removeStep} steps={steps.steps} editStep={editStep}/>
                    </FormControl>


                    {/*<FormControl mb={2}>*/}
                    {/*    <Flex alignItems={"center"}>*/}
                    {/*        <FormLabel mb={0}>Make this recipe private?</FormLabel>*/}
                    {/*        <Switch ref={privateRef}/>*/}
                    {/*    </Flex>*/}
                    {/*    <FormHelperText>If a recipe is private, only those you share it with will be able to view*/}
                    {/*        it.</FormHelperText>*/}
                    {/*</FormControl>*/}

                    <FormControl mb={3}>
                        <FormLabel mb={0}>Tags</FormLabel>
                        <FormHelperText mb={1}>Add tags to make the recipe easier to search for.</FormHelperText>
                        <Tags addTag={addTag} removeTag={removeTag} tags={tags.tags}/>
                    </FormControl>

                    <FormControl mb={2}>
                        <FormLabel mb={0}>Additional Notes</FormLabel>
                        <Textarea ref={notesRef}/>
                    </FormControl>

                    {
                        !editing &&
                        <FormControl mb={2}>
                            <FormLabel mb={0}>Add to a Cookbook</FormLabel>
                            <CheckboxGroup onChange={setSelectedCookbooks}>
                                <SimpleGrid spacing={1}>
                                    {cookbooks.map((cookbook, index) => {
                                        return (
                                            <Checkbox
                                                key={index}
                                                value={cookbook._id}
                                            >{cookbook.title}</Checkbox>
                                        )
                                    })}
                                </SimpleGrid>
                            </CheckboxGroup>
                        </FormControl>
                    }
                    <FormControl mb={2} mt={4}>
                        <FormLabel mb={0}>Related Recipes</FormLabel>
                        <FormHelperText>If this recipe has a sauce or a certain dish that always goes with it, link it
                            here</FormHelperText>
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
                        <Box border={"1px solid lightgrey"} pl={3}>
                            {filteredRecipes.map((recipe, index) => {
                                return (
                                    <RelatedRecipeTag key={index} recipe={recipe}
                                                      clickHandler={toggleRelatedRecipeSelect}
                                                      relatedRecipes={relatedRecipes}/>
                                )
                            })}
                        </Box>
                    </FormControl>
                    <Flex justifyContent={"flex-end"}>
                        <Button
                            type="button"
                            colorScheme="grey"
                            variant={'outline'}
                            mr={3}
                            onClick={() => {
                                navigate(-1)
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type={"submit"}
                            colorScheme="blue"
                            disabled={isLoading}
                            isLoading={isLoading}
                        >
                            {editing ? 'Update Recipe' : 'Create Recipe'}
                        </Button>

                    </Flex>
                </form>
            </Box>
        </Template>
    )
}

export default CreateRecipe