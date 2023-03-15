import Template from "../components/ui/template";
import {useParams} from "react-router-dom";
import useHttp from "../util/use-http";
import {useEffect, useState} from "react";
import {Flex, Heading, Spinner, useDisclosure, useToast} from '@chakra-ui/react'
import ViewRecipeHeader from "../components/viewRecipe/viewRecipeHeader";
import ViewRecipeTitle from "../components/viewRecipe/viewRecipeTitle";
import RecipeBody from "../components/viewRecipe/recipeBody";
import ShareModal from "../components/ui/shareModal";
import {userTokenAtom} from "../store/atoms";
import {useAtom} from "jotai";

const ViewRecipe = () => {

    const {id} = useParams()
    const {isLoading, error, sendRequest} = useHttp()
    const [recipe, setRecipe] = useState({})
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [groups, setGroups] = useState([])
    const [userToken, setUserToken] = useAtom(userTokenAtom);
    const toast = useToast()

    const shareRecipeWithGroupHandler = (groups) => {
        groups.forEach(group => {
            sendRequest({
                url: `${process.env.REACT_APP_SERVER_URL}/recipe/shareWithGroup`,
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: {
                    recipeId: id,
                    recipientId: group._id,
                }
            }, response => {
                if (!error) {
                    //put up toast
                    toast({
                        title: "Recipe shared",
                        description: "Recipe has been shared with group",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                        position: "top-right"
                    })
                }
            })
        })
    }


    //Get recipe
    useEffect(() => {
        sendRequest({
            url: `${process.env.REACT_APP_SERVER_URL}/recipe/${id}`,
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }, response => {
            if (!error) {
                setRecipe(response.recipe)
                if (userToken) {
                    sendRequest({
                        url: `${process.env.REACT_APP_SERVER_URL}/group/userGroups`,
                        method: 'GET',
                        headers: {'Content-Type': 'application/json'}
                    }, response => {
                        if (!error) {
                            setGroups(response.groups)
                        }
                    })
                }
            }
        })
    }, [error, id, sendRequest, setGroups])

    useEffect(() => {
        if (error) {
            toast({
                title: "An error occurred.",
                description: "We're sorry, but an error occurred. Please try again.",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top-right"
            })
        }
    }, [error])

    if (isLoading) {
        return (
            <Template>
                <Flex mt={3} justify={"center"}>
                    <Spinner/>
                </Flex>
            </Template>
        )
    }
    return (
        <Template>
            <ViewRecipeHeader isFavorite={recipe.isFavorite} showShareModal={onOpen}/>
            <ViewRecipeTitle title={recipe.title} id={id} isOwner={recipe.isOwner}/>
            <RecipeBody recipe={recipe}/>
            <ShareModal
                isOpen={isOpen}
                closeHandler={onClose}
                title="Share Recipe With a Group"
                shareResource={shareRecipeWithGroupHandler}
                resourceList={groups}
            />
        </Template>
    )

}

export default ViewRecipe