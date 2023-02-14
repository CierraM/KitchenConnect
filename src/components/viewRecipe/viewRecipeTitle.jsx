import {Heading, Flex, Box, IconButton} from "@chakra-ui/react";
import {DeleteIcon, EditIcon} from "@chakra-ui/icons";


const ViewRecipeTitle = ({title}) => {

    const showDeleteModal = () => {

    }

    const editRecipe = () => {

    }

    return (
            <Flex my={3} alignItems={"center"}>
            <Heading as={"h2"}>{title}</Heading>
                <IconButton
                    size={"md"}
                    aria-label={'delete'}
                    icon={<DeleteIcon/>}
                    colorScheme={"red"}
                    variant={"link"}
                    onClick={showDeleteModal}/>
                <IconButton
                    size={"md"}
                    aria-label={'edit'}
                    icon={<EditIcon/>}
                    variant={"link"}
                    onClick={editRecipe}/>
            </Flex>
    )
}

export default ViewRecipeTitle