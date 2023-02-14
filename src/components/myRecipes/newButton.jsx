import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    Button
} from '@chakra-ui/react'
import {AddIcon} from "@chakra-ui/icons"

const NewButton = () => {
    return (
        <Menu pos={"relative"} >
            <MenuButton
                pos={"absolute"}
                bottom={0}
                right={0}
                as={Button}
                colorScheme={"orange"}
                shadow={"lg"}
                m={"5"}
                _hover={{shadow: "sm"}}
                rightIcon={<AddIcon />}
            >
                New
            </MenuButton>
            <MenuList>
                <MenuItem>Recipe</MenuItem>
                <MenuItem>Cookbook</MenuItem>
            </MenuList>
        </Menu>
    )
}

export default NewButton