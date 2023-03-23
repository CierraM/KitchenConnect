import {Text, Box, Heading, UnorderedList, ListItem, VStack, Flex, OrderedList} from "@chakra-ui/react";
import RecipeCard from "../myRecipes/recipeCard";
import List from "../myRecipes/list";


const RecipeBody = ({recipe}) => {
    return (
        <Box my={3} maxW={'900px'} mx={'auto'}>
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
            <OrderedList spacing={3}>
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
                <List items={recipe.related} type={"recipe"}></List>
            </>}
        </Box>

    )
}

export default RecipeBody