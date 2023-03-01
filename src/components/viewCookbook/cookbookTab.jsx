import {Button, Heading, Flex, Link, IconButton} from "@chakra-ui/react";
import {Link as ReactRouterLink} from "react-router-dom";
import FilterSection from "../myRecipes/filterButton";
import List from "../myRecipes/List";
import {ArrowBackIcon, EditIcon, ExternalLinkIcon} from "@chakra-ui/icons";
import {useNavigate} from "react-router-dom";
import {useState} from "react";


const CookbookTab = ({cookbook}) => {
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
            </Flex>
            <FilterSection></FilterSection>
            <List items={cookbook.recipes} type={"recipe"}/>
        </>
    )
}

export default CookbookTab