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
import {ChevronDownIcon} from "@chakra-ui/icons";

const SortButton = () => {
    //TODO: make these arrows instead
    return (
        <Menu closeOnSelect={false}>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon/>} m={2}>
                Sort
            </MenuButton>
            <MenuList minWidth='240px'>
                <MenuOptionGroup defaultValue='desc' type='radio'>
                    <MenuItemOption value='desc'>Alphabetical descending</MenuItemOption>
                    <MenuItemOption value='asc'>Alphabetical ascending</MenuItemOption>
                    <MenuItemOption value='tagsAsc'>Tags ascending</MenuItemOption>
                    <MenuItemOption value='tagsDesc'>Tags descending</MenuItemOption>
                </MenuOptionGroup>
            </MenuList>
        </Menu>
    )
}

export default SortButton