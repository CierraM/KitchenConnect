import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Link,
    Button, useDisclosure, useToast
} from '@chakra-ui/react'
import {Link as ReactRouterLink, useNavigate} from "react-router-dom";
import {AddIcon} from "@chakra-ui/icons"
import ShareModal from "../ui/shareModal";
import {useEffect, useState} from "react";
import useHttp from "../../util/use-http";

const GroupRecipeAddButton = ({groupInfo, reload}) => {
    const navigate = useNavigate();
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [shareModalProps, setShareModalProps] = useState(
        {
            title: "",
            resourceList: [],
            shareResource: () => {},
        })
    const {sendRequest, isLoading, error} = useHttp()
    const toast = useToast()

    useEffect(() => {
        if (error) {
            toast({
                title: "An error occurred.",
                description: error,
                status: "error",
                duration: 9000,
                isClosable: true,
            })
        }
    })

    const shareRecipeHandler = (recipes) => {
        recipes.forEach(recipe => {
            sendRequest({
                url: `${process.env.REACT_APP_SERVER_URL}/recipe/shareWithGroup`,
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: {
                    recipeId: recipe._id,
                    recipientId: groupInfo._id
                }
            }, response => {
                if (!error) {
                    reload()
                    toast({
                        title: "Recipe shared",
                        description: "Recipe has been shared with group",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                    })
                }
            })
        })
    }

    const shareCookbookHandler = (cookbooks) => {
        cookbooks.forEach(cookbook => {
            sendRequest({
                url: `${process.env.REACT_APP_SERVER_URL}/cookbook/shareWithGroup`,
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: {
                    cookbookId: cookbook._id,
                    recipientId: groupInfo._id,
                    permissionLevel: 'write'
                }
            }, response => {
                if (!error) {
                    reload()
                    toast({
                        title: "Cookbook shared",
                        description: "Cookbook has been shared with group",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                    })
                }
            })
        })
    }

    const shareRecipe = () => {
                sendRequest({
                    url: `${process.env.REACT_APP_SERVER_URL}/user/myRecipes`,
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'}
                }, response => {
                    if (!error) {
                        const cookbookRecipes = [].concat.apply([], response.cookbooks.map(c => c.recipes))
                        const allRecipes = response.recipes.concat(cookbookRecipes)
                            .filter((v, i, a) => i === a.findIndex(t => (t._id === v._id)))
                        setShareModalProps({
                            title: "Share Recipe",
                            resourceList: allRecipes,
                            shareResource: shareRecipeHandler
                        })
                        onOpen()
                    }
                })
    }

    const shareCookbook = () => {
        sendRequest({
            url: `${process.env.REACT_APP_SERVER_URL}/user/myRecipes`,
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }, response => {
            if (!error) {
                setShareModalProps({
                    title: "Share Cookbook",
                    resourceList: response.cookbooks,
                    shareResource: shareCookbookHandler
                })
                onOpen()
            }
        })
    }
    return (
        <>
            <Menu pos={"relative"}>
                <MenuButton
                    pos={"absolute"}
                    bottom={0}
                    right={0}
                    as={Button}
                    colorScheme={"orange"}
                    shadow={"lg"}
                    m={"5"}
                    _hover={{shadow: "sm"}}
                    rightIcon={<AddIcon/>}
                >
                    Add
                </MenuButton>
                <MenuList>
                    <Button as={ReactRouterLink} onClick={shareRecipe} variant={"unstyled"}>
                        <MenuItem>
                            Recipe
                        </MenuItem>
                    </Button>
                    <Button as={ReactRouterLink} onClick={shareCookbook} variant={"unstyled"}>
                        <MenuItem>
                            Cookbook
                        </MenuItem>
                    </Button>
                </MenuList>
            </Menu>
            <ShareModal isOpen={isOpen} closeHandler={onClose} {...shareModalProps} />
        </>
    )
}

export default GroupRecipeAddButton