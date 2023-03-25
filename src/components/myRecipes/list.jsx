//this component shows all recipes and cookbooks according to the criteria passed in by filters
import {Flex, SimpleGrid} from "@chakra-ui/react";
import RecipeCard from "./recipeCard";

const List = ({items, type, selectedTags}) => {
        return (
            <SimpleGrid columns={[1, null, 2, 3, 4]} spacing={'10px'} >
                {items?.length === 0 && <Flex>Nothing to show</Flex>}
                {items?.map((item, index) => {
                    return <RecipeCard
                        key={index}
                        item={item}
                        type={type}
                        showTags={type === 'recipe' ? true : false}
                        selectedTags={selectedTags}
                    />
                })}
            </SimpleGrid>
        )

}

export default List;