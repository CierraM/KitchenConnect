import {LinkBox, LinkOverlay, Box, Text, Heading, Link, Container, Card, CardBody} from '@chakra-ui/react'
import {Link as ReactRouterLink} from "react-router-dom"

const RecipeCard = ({item, type}) => {
    return (
        <Link as={ReactRouterLink} to={`/${type}/${item._id}`} w={"full"} _hover={{textDecoration: "none", shadow: "md"}}>
            <Card shadow={"sm"} variant={"outline"}>
                <CardBody>
                    <Text>{item.title}</Text>
                </CardBody>
            </Card>
        </Link>
    )
}

export default RecipeCard