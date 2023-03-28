import { Heading, Flex, Link, IconButton, useDisclosure, useToast} from "@chakra-ui/react";
import {Link as ReactRouterLink} from "react-router-dom";
import {ArrowBackIcon, DeleteIcon, EditIcon, ExternalLinkIcon} from "@chakra-ui/icons";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import DeleteDialog from "../ui/deleteDialog";
import ShareModal from "../ui/shareModal";
import useHttp from "../../util/use-http";
import RecipesWithSortAndFilter from "../myRecipes/recipesWithSortAndFilter";
import BackButton from "../ui/backButton";


const CookbookTab = ({cookbook, id}) => {
    const {
        isOpen: deleteModalIsOpen,
        onOpen: deleteModalOnOpen,
        onClose: deleteModalOnClose} = useDisclosure()
    const {
        isOpen: shareModalIsOpen,
        onOpen: shareModalOnOpen,
        onClose: shareModalOnClose} = useDisclosure()
    const navigate = useNavigate();
    const [groups, setGroups] = useState([])
    const toast = useToast()
    const {sendRequest, isLoading, error} = useHttp()

    const shareCookbookWithGroupHandler = (groups) => {
        groups.forEach(group => {
            sendRequest(
                 {
                url: `${process.env.REACT_APP_SERVER_URL}/cookbook/shareWithGroup`,
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: {
                    cookbookId: id,
                    recipientId: group._id,
                    permissionLevel: 'write'
                }

            }, response => {
                    if (response.ok) {
                        toast({
                            title: "Cookbook shared successfully",
                            status: "success",
                            duration: 3000,
                            isClosable: true,
                        })
                        shareModalOnClose()
                    }
            })
        })
    }

    useEffect(() => {
        if (error) {
            toast({
                title: "An error occurred",
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        }
    }, [error, toast])

    //get groups
    useEffect(() => {
        sendRequest({
            url: `${process.env.REACT_APP_SERVER_URL}/group/userGroups`,
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }, response => {
            if (!error) {
                setGroups(response.groups)
            }
        })
    }, [sendRequest, error, setGroups])

    return (
        <>
            <BackButton/>
            <Flex alignItems="center">
                <Heading>{cookbook.title}</Heading>
                <Link as={ReactRouterLink} to={'./edit'}>
                    <IconButton
                        size={"md"}
                        aria-label={'edit'}
                        icon={<EditIcon/>}
                        variant={"link"}
                    />
                </Link>
                <IconButton
                    aria-label={'share'}
                    icon={<ExternalLinkIcon/>}
                    variant={"link"}
                    onClick={shareModalOnOpen}
                />
                <IconButton
                    size={"md"}
                    aria-label={'delete'}
                    icon={<DeleteIcon/>}
                    colorScheme={"red"}
                    variant={"link"}
                    onClick={deleteModalOnOpen}/>
            </Flex>
            <RecipesWithSortAndFilter recipes={cookbook?.recipes} isLoading={isLoading}/>
            <DeleteDialog isOpen={deleteModalIsOpen} onClose={deleteModalOnClose} deleteUrl={`${process.env.REACT_APP_SERVER_URL}/cookbook/delete/${id}`} title={"Delete Cookbook"}/>
            <ShareModal
                isOpen={shareModalIsOpen}
                closeHandler={shareModalOnClose}
                title={"Share Cookbook With a Group"}
                shareResource={shareCookbookWithGroupHandler}
                resourceList={groups}
            />
        </>
    )
}

export default CookbookTab