import {Flex, VStack, IconButton, Text, Spacer} from "@chakra-ui/react";
import {DeleteIcon, SmallCloseIcon} from "@chakra-ui/icons";


const IngredientList = ({ingredients, removeIngredient}) => {

    return (
        <Flex w={"full"} flexDirection={"column"} >
            {ingredients.map((ingredient, index) => {
                return (
                    <Flex key={index} alignItems={"center"}>
                        <Text>{ingredient}</Text>
                        <Spacer/>
                        <IconButton aria-label={'delete'} icon={<SmallCloseIcon/>} onClick={(e) => {removeIngredient(ingredient)}}/>
                    </Flex>
                )
            })}
        </Flex>
    )
}

export default IngredientList