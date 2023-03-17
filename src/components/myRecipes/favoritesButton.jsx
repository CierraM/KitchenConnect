import {Link as ReactRouterLink} from 'react-router-dom'
import {Box, Button, Link} from "@chakra-ui/react";


const FavoritesButton = () => {
    return <
        Link
        as={ReactRouterLink}
        to={"/favorites"}
    >
        <Button>
            Favorites
        </Button>
    </Link>
}

export default FavoritesButton