import {LinkBox, LinkOverlay, Box, Text, Heading, Link, Container, Card, CardBody, Tag} from '@chakra-ui/react'
import {Link as ReactRouterLink} from "react-router-dom"

const RecipeCard = ({item, type, showTags = false}) => {

    return (
        <Link as={ReactRouterLink} to={`/${type}/${item._id}`} w={"full"}
              _hover={{textDecoration: "none", shadow: "md"}}>
            <Card shadow={"sm"} variant={"outline"}>
                <CardBody>
                    <Text>{item.title}</Text>
                    {showTags && item.tags.map((tag, index) => {
                        return <Tag key={index}>{tag}</Tag>
                    })}
                </CardBody>
            </Card>
        </Link>
    )
}

export default RecipeCard