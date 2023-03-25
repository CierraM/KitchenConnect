import {Heading, Flex, IconButton, Link, useDisclosure} from "@chakra-ui/react";
import {DeleteIcon, EditIcon} from "@chakra-ui/icons";
import {Link as ReactRouterLink} from "react-router-dom";
import DeleteDialog from "../ui/deleteDialog";


const ViewRecipeTitle = ({title, id, isOwner}) => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    return (
        <>
            <Flex my={3} alignItems={"center"} justify={'center'}>
                <Heading as={"h2"}>{title}</Heading>
                {isOwner &&
                    <>
                        <IconButton
                            size={"md"}
                            aria-label={'delete'}
                            icon={<DeleteIcon/>}
                            colorScheme={"red"}
                            variant={"link"}
                            onClick={onOpen}/>
                        <Link as={ReactRouterLink} to={'./edit'}>
                            <IconButton
                                size={"md"}
                                aria-label={'edit'}
                                icon={<EditIcon/>}
                                variant={"link"}
                            />
                        </Link>
                    </>
                }
            </Flex>
            <DeleteDialog
                isOpen={isOpen}
                onClose={onClose}
                onOpen={onOpen}
                deleteUrl={`${process.env.REACT_APP_SERVER_URL}/recipe/delete/${id}`}
                title={'Delete Recipe'}
            />
        </>
    )
}

export default ViewRecipeTitle