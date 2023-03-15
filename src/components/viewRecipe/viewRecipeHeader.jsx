import {Flex, IconButton, Button, Spacer, Icon, useDisclosure, Link} from "@chakra-ui/react";
import {ArrowBackIcon, DeleteIcon, EditIcon, ExternalLinkIcon} from "@chakra-ui/icons";
import {useNavigate} from "react-router-dom";
import {FaHeart, FaRegHeart} from "react-icons/fa";
import {useState} from "react";
import {Link as ReactRouterLink} from "react-router-dom";

const ViewRecipeHeader = ({isFavorite, showShareModal}) => {
    const navigate = useNavigate();
    const [showAsFavorite, setShowAsFavorite] = useState(isFavorite)


    const toggleFavorite = () => {
        setShowAsFavorite(!showAsFavorite)
    }
    let favoriteIcon = showAsFavorite ? FaHeart : FaRegHeart;
    return (
        <Flex py={3}>
            <Link aria-label={'back'} as={ReactRouterLink} to="/myRecipes"><ArrowBackIcon/> Back </Link>
            <Spacer></Spacer>

            <IconButton
                aria-label={'favorite'}
                icon={< Icon as={favoriteIcon}/>}
                    colorScheme="red"
                variant={"link"}
                onClick={toggleFavorite}
            />
            <IconButton
                aria-label={'share'}
                icon={<ExternalLinkIcon/>}
                variant={"link"}
                onClick={showShareModal}
            />
        </Flex>
    )
}

export default ViewRecipeHeader