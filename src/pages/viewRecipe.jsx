import Template from "../components/ui/template";
import {useNavigate, useParams} from "react-router-dom";
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
    const {isLoading: favoriteIsLoading, error: favoriteError, sendRequest: sendFavoriteRequest} = useHttp()
    const [recipe, setRecipe] = useState({})
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [groups, setGroups] = useState([])
    const [userToken, setUserToken] = useAtom(userTokenAtom);
    const toast = useToast();
    const navigate = useNavigate();

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
        if (id == 'undefined') {
            navigate('/error')
        }
        sendRequest({
            url: `${process.env.REACT_APP_SERVER_URL}/recipe/${id}`,
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }, response => {
            if (!error) {
                setRecipe(response.recipe)
                if (userToken) {
                    //get user favorites
                    sendFavoriteRequest({
                        url: `${process.env.REACT_APP_SERVER_URL}/user/favorites`,
                        method: 'GET',
                        headers: {'Content-Type': 'application/json'}
                    }, response => {
                        if (!error) {
                            setRecipe(prevState => ({
                                ...prevState,
                                isFavorite: response.favorites.map(r => r._id).includes(id)
                            }))
                        }
                    })
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

    const toggleFavorite = () => {
        let body = {}
        if (recipe.isFavorite) {
            body = {
                '$pull': { favoriteRecipes: recipe._id }
            }
        } else {
            body = {
                '$push': { favoriteRecipes: recipe._id }
            }
        }
            sendFavoriteRequest({
            url: `${process.env.REACT_APP_SERVER_URL}/user/update`,
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: {
                changes: body
            }
        }, response => {
            if (!error) {
                setRecipe(prevState => ({
                    ...prevState,
                    isFavorite: !prevState.isFavorite
                }))
            }
        }) }

    return (
        <Template>
            <ViewRecipeHeader isFavorite={recipe.isFavorite} showShareModal={onOpen} toggleFavorite={toggleFavorite} favoriteLoading={favoriteIsLoading}/>
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