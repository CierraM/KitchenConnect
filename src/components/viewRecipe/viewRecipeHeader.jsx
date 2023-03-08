import {Flex, IconButton, Button, Spacer, Icon, useDisclosure} from "@chakra-ui/react";
import {ArrowBackIcon, DeleteIcon, EditIcon, ExternalLinkIcon} from "@chakra-ui/icons";
import {useNavigate} from "react-router-dom";
import {FaHeart, FaRegHeart} from "react-icons/fa";
import {useState} from "react";

const ViewRecipeHeader = ({isFavorite, showShareModal}) => {
    const navigate = useNavigate();
    const [showAsFavorite, setShowAsFavorite] = useState(isFavorite)
    const goBack = () => {
        navigate(-1)
    }

    const toggleFavorite = () => {
        setShowAsFavorite(!showAsFavorite)
    }
    let favoriteIcon = showAsFavorite ? FaHeart : FaRegHeart;
    return (
        <Flex py={3}>
            <Button aria-label={'back'} variant={"link"} onClick={goBack}><ArrowBackIcon/> Back </Button>
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