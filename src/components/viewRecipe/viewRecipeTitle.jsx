import {Heading, Flex, Box, IconButton, Link} from "@chakra-ui/react";
import {DeleteIcon, EditIcon} from "@chakra-ui/icons";
import {Link as ReactRouterLink} from "react-router-dom";


const ViewRecipeTitle = ({title}) => {

    const showDeleteModal = () => {

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
            <Link as={ReactRouterLink} to={'./edit'}>
                <IconButton
                    size={"md"}
                    aria-label={'edit'}
                    icon={<EditIcon/>}
                    variant={"link"}
                />
            </Link>
        </Flex>
    )
}

export default ViewRecipeTitle