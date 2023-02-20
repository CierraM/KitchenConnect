import Template from "../components/ui/template";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Box, Heading, Textarea, Switch, Flex, VStack, IconButton, Button
} from '@chakra-ui/react'
import Ingredients from "../components/createRecipe/ingredients/ingredients";
import Steps from "../components/createRecipe/steps/steps";
import Tags from "../components/createRecipe/tags/tags";
import {useRef, useState} from "react";
import AddToCookbook from "../components/createRecipe/cookbook/AddToCookbook";
import useHttp from "../util/use-http";
import {useEffect} from "react";

const CreateRecipe = () => {
    //TODO: add drag handles to ingredients and steps
    const [cookboooks, setCookbooks] = useState([])
    const {isLoading, error, sendRequest} = useHttp()

    const titleInputRef = useRef();
    const descriptionInputRef = useRef();

    useEffect(() => {
        sendRequest({
            url: `${process.env.REACT_APP_SERVER_URL}/user/myRecipes`,
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }, response => {
            if (!error) {
                setCookbooks(response.cookbooks)
            }
        })
    }, [error, sendRequest])

    const [tags, setTags] = useState({tags: []});

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

    const [ingredients, setIngredients] = useState({ingredients: []});
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

    const [steps, setSteps] = useState({steps: []});

    const addStep = (step) => {
        if (!step) {
            return;
        }
        let temp = steps.steps;
        temp.push(step)
        setSteps({steps: temp})
    }
    const removeStep = (step) => {
        let temp = steps.steps;
        let result = [];
        temp.forEach(i => {
            if (i !== step) {
                result.push(i)
            }
        })
        setSteps({steps: result})
    }


    const handleSubmit = () => {
        const request = {
            title: titleInputRef.current.value,
            description: descriptionInputRef.current.value,
 dcfgh;''            ingredients: ingredients,
            steps: steps,

        }

    }
    return (
        <Template>
            <Box py={3}>
                <Heading>New Recipe</Heading>
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
                                     ingredients={ingredients.ingredients}/>
                    </FormControl>

                    <FormControl mb={2}>
                        <FormLabel mb={0}>Steps</FormLabel>
                        <Steps addStep={addStep} removeStep={removeStep} steps={steps.steps}/>
                    </FormControl>

                    <FormControl mb={2}>
                        <FormLabel mb={0}>Additional Notes</FormLabel>
                        <Textarea/>
                    </FormControl>

                    <FormControl mb={2}>
                        <Flex alignItems={"center"}>
                            <FormLabel mb={0}>Make this recipe private?</FormLabel>
                            <Switch></Switch>
                        </Flex>
                        <FormHelperText>If a recipe is private, only those you share it with will be able to view
                            it.</FormHelperText>
                    </FormControl>

                    <FormControl mb={3}>
                        <FormLabel mb={0}>Tags</FormLabel>
                        <FormHelperText mb={1}>Add tags to make the recipe easier to search for.</FormHelperText>
                        <Tags addTag={addTag} removeTag={removeTag} tags={tags.tags}/>
                    </FormControl>

                    {
                        cookboooks.length > 0 &&
                        <FormControl mb={2}>
                            <FormLabel mb={0}>Add to a Cookbook</FormLabel>
                            <AddToCookbook cookbooks={cookboooks}/>
                        </FormControl>
                    }
                    <FormControl mb={2}>
                        <FormLabel mb={0}>Related Recipes</FormLabel>
                        <p>Put related recipe search here</p>
                    </FormControl>
                    <Button type={"submit"}>Create Recipe</Button>
                </form>
            </Box>
        </Template>
    )
}

export default CreateRecipe