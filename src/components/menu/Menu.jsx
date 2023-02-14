import {useRef} from 'react'
import {HamburgerIcon} from '@chakra-ui/icons'
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
    Link, Flex
} from '@chakra-ui/react'
import {Link as ReactRouterLink} from "react-router-dom"

const Menu = () => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const btnRef = useRef()

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
                            <Link as={ReactRouterLink} to={"/"}>My Recipes</Link>
                            <Link as={ReactRouterLink} to={"/myCookbooks"}>My Cookbooks</Link>
                            <p>My Groups</p>
                        </Flex>

                    </DrawerBody>

                </DrawerContent>
            </Drawer>
        </>
    )
}

export default Menu