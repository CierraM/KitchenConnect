import {
    Menu,
    MenuButton,
    MenuList,
    MenuItemOption,
    MenuOptionGroup,
    Button
} from '@chakra-ui/react'
import {ChevronDownIcon} from "@chakra-ui/icons";

const SortButton = ({sortHandler}) => {

    return (
        <Menu closeOnSelect={false}>
            <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon/>}
                m={2} variant={"solid"}
                colorScheme={'primary'}
                size={"sm"}
                minW={'auto'}
            >
                Sort
            </MenuButton>
            <MenuList minWidth='240px'>
                <MenuOptionGroup defaultValue='asc' type='radio' onChange={sortHandler}>
                    <MenuItemOption value='asc'>Alphabetical</MenuItemOption>
                    <MenuItemOption value='desc'> Reverse Alphabetical</MenuItemOption>
                    <MenuItemOption value='tagsDesc'>Tags</MenuItemOption>
                </MenuOptionGroup>
            </MenuList>
        </Menu>
    )
}

export default SortButton