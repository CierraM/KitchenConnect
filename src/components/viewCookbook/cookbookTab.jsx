import {Button, Heading, Flex, Link, IconButton} from "@chakra-ui/react";
import {Link as ReactRouterLink} from "react-router-dom";
import FilterSection from "../myRecipes/filterButton";
import List from "../myRecipes/List";
import {ArrowBackIcon, ExternalLinkIcon} from "@chakra-ui/icons";
import {useNavigate} from "react-router-dom";
import {useState} from "react";


const CookbookTab = ({cookbook}) => {
    const showShareModal = () => {

    }

    return (
        <>
            <Link as={ReactRouterLink} to="/myCookbooks" aria-label={'back'} variant={"link"}><ArrowBackIcon/> Back </Link>
            <Flex>
                <Heading>{cookbook.title}</Heading>
                <IconButton
                    aria-label={'share'}
                    icon={<ExternalLinkIcon/>}
                    variant={"link"}
                    onClick={showShareModal}
                />
            </Flex>
            <FilterSection></FilterSection>
            <List items={cookbook.recipes} type={"cookbook"}/>
        </>
    )
}

export default CookbookTab