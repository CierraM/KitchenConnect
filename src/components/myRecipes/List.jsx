//this component shows all recipes and cookbooks according to the criteria passed in by filters
import {Flex, VStack} from "@chakra-ui/react";
import RecipeCard from "./recipeCard";

const List = ({items, type}) => {
    return (
        <VStack>
            {items?.map((item, index) => {
                return <RecipeCard key={index} item={item} type={type}/>
            })}
        </VStack>
    )
}

export default List;