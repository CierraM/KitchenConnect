import {LinkBox, LinkOverlay, Box, Text, Heading, Link, Container, Card, CardBody, Tag} from '@chakra-ui/react'
import {Link as ReactRouterLink} from "react-router-dom"

const RecipeCard = ({item, type, showTags = false}) => {

    return (
        <Link as={ReactRouterLink} to={`/${type}/${item?._id}`} w={"full"}
              _hover={{textDecoration: "none", shadow: "md"}}>
            <Card shadow={"md"} variant={"outline"} colorScheme="primary" >
                <CardBody>
                    <Text fontWeight={"bold"}>{item?.title}</Text>
                    {showTags && item?.tags.map((tag, index) => {
                        return <Tag
                            key={index}
                            variant={"outline"}
                            colorScheme="primary"
                            mr={2}
                            mt={.5}
                            borderRadius={"full"}
                        >{tag}</Tag>
                    })}
                </CardBody>
            </Card>
        </Link>
    )
}

export default RecipeCard