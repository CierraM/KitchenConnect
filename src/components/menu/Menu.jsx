import { useRef } from 'react'
import { HamburgerIcon } from '@chakra-ui/icons'
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
    IconButton
} from '@chakra-ui/react'
  
const Menu =  () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()
  
    return (
        <>
            <IconButton icon={<HamburgerIcon/>} ref={btnRef} onClick={onOpen} />        
        <Drawer
          isOpen={isOpen}
          placement='left'
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>KitchenConnect</DrawerHeader>
  
            <DrawerBody>
              <p>My Recipes</p>
                <p>My Cookbooks</p>
                <p>My Groups</p>
            </DrawerBody>

          </DrawerContent>
        </Drawer>
      </>
    )
}

export default Menu