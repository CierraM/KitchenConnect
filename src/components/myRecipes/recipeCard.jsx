import {Text, Link, Card, CardBody, Tag} from '@chakra-ui/react'
import {Link as ReactRouterLink} from "react-router-dom"

const RecipeCard = ({item, type, showTags = false, selectedTags}) => {

    return (
        <Link
            as={ReactRouterLink}
            to={`/${type}/${item?._id}`}
            _hover={{textDecoration: "none", shadow: "md"}}
            w={'full'}
        >
            <Card
                shadow={"lg"}
                variant={"outline"}
                h={'full'}
            >
                <CardBody>
                    <Text fontWeight={"bold"}>{item?.title}</Text>
                    {showTags && item?.tags.map((tag, index) => {
                        const variant = selectedTags?.includes(tag.toLowerCase()) ? "solid" : "outline"
                        return <Tag
                            key={index}
                            variant={variant}
                            colorScheme="primary"
                            mr={2}
                            mt={.5}
                            borderRadius={"full"}
                        >{tag.toLowerCase()}</Tag>
                    })}
                </CardBody>
            </Card>
        </Link>
    )
}

export default RecipeCard