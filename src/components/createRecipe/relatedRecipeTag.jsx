import {Button, Text} from "@chakra-ui/react";
import {CloseIcon} from "@chakra-ui/icons";


const RelatedRecipeTag = ({relatedRecipes, recipe, clickHandler}) => {
    const selected = relatedRecipes.map(r => {
        return r._id
    }).includes(recipe._id);

    return (
        <Button
            cursor="pointer"
            variant={"outline"}
            borderColor={selected ? "accent.500" : "grey"}
            color={selected ? "accent.500" : "black"}
            borderWidth={selected ? 2 : 1}
            borderRadius={0}
            my={3} mx={0}
            w={"fit-content"}
            display={"block"}
            display={"flex"}
            alignItems={"center"}
            onClick={e => {
                clickHandler(recipe)
            }}
            rightIcon={selected && <CloseIcon/>}
        >
            <Text>{recipe.title} </Text>
        </Button>
    )
}

export default RelatedRecipeTag