import {
    Flex,
    VStack,
    IconButton,
    Text,
    Spacer,
    ListItem,
    UnorderedList,
    EditablePreview,
    EditableInput, Editable
} from "@chakra-ui/react";
import {DeleteIcon, CloseIcon} from "@chakra-ui/icons";


const IngredientList = ({ingredients, removeIngredient, editIngredient}) => {

    return (
        <UnorderedList flexDirection={"column"} mb={2}>
            {ingredients.map((ingredient, index) => {
                return (
                    <ListItem key={index} _hover={{backgroundColor: '#e0e0e0'}}>
                    <Flex alignItems={"center"}>
                        <Editable
                            value={ingredient}
                            width={'full'}
                            onChange={(nextValue) => editIngredient(nextValue, index)}
                        >
                            <EditablePreview w={'full'}/>
                            <EditableInput></EditableInput>
                        </Editable>
                        <Spacer/>
                        <IconButton
                            aria-label={'delete'}
                            icon={<CloseIcon/>}
                            onClick={(e) => {removeIngredient(ingredient)}}
                            variant={'link'}
                            color={"primary.500"}
                            size={"md"}
                        />
                    </Flex>
                    </ListItem>
                )
            })}
        </UnorderedList>
    )
}

export default IngredientList