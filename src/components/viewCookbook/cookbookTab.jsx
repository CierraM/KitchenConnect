import {Button, Heading, Flex, Link} from "@chakra-ui/react";
import {Link as ReactRouterLink} from "react-router-dom";
import FilterSection from "../myRecipes/filterButton";
import List from "../myRecipes/List";
import {ArrowBackIcon} from "@chakra-ui/icons";
import {useNavigate} from "react-router-dom";
import {useState} from "react";


const CookbookTab = ({cookbook}) => {

    return (
        <>
            <Link as={ReactRouterLink} to="/myCookbooks" aria-label={'back'} variant={"link"}><ArrowBackIcon/> Back </Link>
            <Heading>{cookbook.title}</Heading>
            <FilterSection></FilterSection>
            <List items={cookbook.recipes} type={"cookbook"}/>
        </>
    )
}

export default CookbookTab