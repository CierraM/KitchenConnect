import {Text, Box, Heading, UnorderedList, ListItem, VStack, Flex, OrderedList} from "@chakra-ui/react";
import RecipeCard from "../myRecipes/recipeCard";


const RecipeBody = ({recipe}) => {

    return (
        <Box my={3}>
            <Text fontStyle={"italic"}>
                {recipe.description}
            </Text>
            <Heading as={"h3"} size={"lg"} mt={"3"}>Ingredients:</Heading>
            <Flex flexDirection={"column"}>
                {recipe.ingredients?.map((ingredient, key) => {
                    return <Text key={key}>{ingredient}</Text>
                })}
            </Flex>
            <Heading as={"h3"} size={"lg"} mt={"3"}>Steps:</Heading>
            <OrderedList>
                {recipe.steps?.sort((a, b) => a.ordinal < b.ordinal)
                    .map((step, key) => {
                        return <ListItem key={key}>{step.text}</ListItem>
                    })}
            </OrderedList>
            {recipe.notes && <>
                <Heading as={"h3"} size={"sm"} mt={"3"}>Notes:</Heading>
                <Text>{recipe.notes}</Text>
            </>}
            {recipe.related?.length > 0 && <>
                <Heading as={"h3"} size={"sm"} mt={"3"}>Related:</Heading>
                {recipe.related.map((recipe, key) => {
                    return <RecipeCard item={recipe} key={key} type={"recipe"}/>
                })}

            </>}
        </Box>

    )
}

export default RecipeBody