import {useEffect, useRef, useState} from 'react'
import {AddIcon, HamburgerIcon} from '@chakra-ui/icons'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Button,
    Input,
    IconButton,
    Link, Flex, UnorderedList, ListItem, Heading, Text
} from '@chakra-ui/react'
import {Link as ReactRouterLink, useNavigate} from "react-router-dom"
import useHttp from "../../util/use-http";

const Menu = () => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const btnRef = useRef()
    const navigate = useNavigate();
    const {isLoading, error, sendRequest} = useHttp();
    const [userGroups, setUserGroups] = useState();

    useEffect(() => {
        sendRequest({
            url: `${process.env.REACT_APP_SERVER_URL}/group/userGroups`,
            headers: {'Content-Type': 'application/json'}
        }, response => {
            if (!error) {
                setUserGroups({groups: response.groups})
            }
        })
    }, [sendRequest, error, setUserGroups])

    const logout = () => {
        sendRequest({
            url: `${process.env.REACT_APP_SERVER_URL}/user/logout`,
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }, response => {
            if (!error) {
                navigate('/login')
            }
        })
    }

    return (
        <>
            <IconButton icon={<HamburgerIcon/>} ref={btnRef} onClick={onOpen}/>
            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay/>
                <DrawerContent>
                    <DrawerCloseButton/>
                    <DrawerHeader>KitchenConnect</DrawerHeader>

                    <DrawerBody>
                        <Flex flexDirection={"column"}>
                            <Link as={ReactRouterLink} to={"/profile"}>My Profile</Link>
                            <Link as={ReactRouterLink} to={"/"}>My Recipes</Link>
                            <Heading size={"sm"} fontWeight={"medium"} pt={2}>Groups:</Heading>
                            {/*<Link as={ReactRouterLink} to={"/myCookbooks"}>My Cookbooks</Link>*/}
                            <UnorderedList listStyleType={"none"}>
                                {userGroups?.groups?.map((group, key) => {
                                    return (<ListItem key={key}>
                                        <Link as={ReactRouterLink} to={`/group/${group._id}`}>{group.name}</Link>
                                    </ListItem>)
                                })}
                                <Flex>
                                    <Link
                                        as={ReactRouterLink}
                                        to={'/group/create'}
                                        py={2}
                                        display={"flex"}
                                        alignItems={"center"}
                                    >
                                        <AddIcon color={"grey"} mr={2}/>
                                        <Text color={"grey"}>new group</Text>
                                    </Link>
                                </Flex>
                            </UnorderedList>
                        </Flex>

                    </DrawerBody>
                    <DrawerFooter>
                        <Button type="button" onClick={logout}>Log Out</Button>

                    </DrawerFooter>

                </DrawerContent>
            </Drawer>
        </>
    )
}

export default Menu