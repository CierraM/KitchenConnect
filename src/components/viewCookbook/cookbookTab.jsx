import {Button, Heading, Flex, Link, IconButton, useDisclosure} from "@chakra-ui/react";
import {Link as ReactRouterLink} from "react-router-dom";
import FilterSection from "../myRecipes/filterButton";
import List from "../myRecipes/list";
import {ArrowBackIcon, DeleteIcon, EditIcon, ExternalLinkIcon} from "@chakra-ui/icons";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import DeleteDialog from "../ui/deleteDialog";


const CookbookTab = ({cookbook, id}) => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const navigate = useNavigate();
    const showShareModal = () => {

    }

    return (
        <>
            <Link as={ReactRouterLink} to="../" aria-label={'back'} variant={"link"}><ArrowBackIcon/> Back </Link>
            <Flex alignItems="center">
                <Heading>{cookbook.title}</Heading>
                <Link as={ReactRouterLink} to={'./edit'}>
                    <IconButton
                        size={"md"}
                        aria-label={'edit'}
                        icon={<EditIcon/>}
                        variant={"link"}
                    />
                </Link>
                <IconButton
                    aria-label={'share'}
                    icon={<ExternalLinkIcon/>}
                    variant={"link"}
                    onClick={showShareModal}
                />
                <IconButton
                    size={"md"}
                    aria-label={'delete'}
                    icon={<DeleteIcon/>}
                    colorScheme={"red"}
                    variant={"link"}
                    onClick={onOpen}/>
            </Flex>
            <FilterSection></FilterSection>
            <List items={cookbook.recipes} type={"recipe"}/>
            <DeleteDialog isOpen={isOpen} onClose={onClose} deleteUrl={`${process.env.REACT_APP_SERVER_URL}/cookbook/delete/${id}`} title={"Delete Cookbook"}/>
        </>
    )
}

export default CookbookTab