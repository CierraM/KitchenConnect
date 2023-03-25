import {Flex, IconButton, Spacer, Icon, Spinner} from "@chakra-ui/react";
import { ExternalLinkIcon} from "@chakra-ui/icons";
import {useNavigate} from "react-router-dom";
import {FaHeart, FaRegHeart} from "react-icons/fa";
import BackButton from "../ui/backButton";

const ViewRecipeHeader = ({isFavorite, showShareModal, toggleFavorite, favoriteLoading}) => {
    const navigate = useNavigate();


    let favoriteIcon = isFavorite ? FaHeart : FaRegHeart;
    return (
        <Flex py={3} justify={'center'}>
            <BackButton/>
            <Spacer></Spacer>

            {favoriteLoading ? <Spinner/> : <IconButton
                aria-label={'favorite'}
                icon={< Icon as={favoriteIcon}/>}
                colorScheme="red"
                variant={"link"}
                onClick={toggleFavorite}
            />}

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