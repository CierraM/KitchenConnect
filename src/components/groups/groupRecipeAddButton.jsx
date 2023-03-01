import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Link,
    Button
} from '@chakra-ui/react'
import {Link as ReactRouterLink} from "react-router-dom";
import {AddIcon} from "@chakra-ui/icons"

const GroupRecipeAddButton = () => {

    return (
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
                <Link as={ReactRouterLink} to={"/createRecipe"} _hover={{textDecoration: "none"}}>
                    <MenuItem>
                        Recipe
                    </MenuItem>
                </Link>
                <Link as={ReactRouterLink} to={"/createCookbook"} _hover={{textDecoration: "none"}}>
                    <MenuItem>
                        Cookbook
                    </MenuItem>
                </Link>
            </MenuList>
        </Menu>
    )
}

export default GroupRecipeAddButton