import {Link as ReactRouterLink} from 'react-router-dom'
import { Button, Link} from "@chakra-ui/react";
import {AiFillHeart} from "react-icons/ai";


const FavoritesButton = () => {
    return <
        Link
        as={ReactRouterLink}
        to={"/favorites"}
    >
        <Button rightIcon={<AiFillHeart/>} variant={"outline"} colorScheme={"primary"} size={"sm"}>
            Favorites
        </Button>
    </Link>
}

export default FavoritesButton