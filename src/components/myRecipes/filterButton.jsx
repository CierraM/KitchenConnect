import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    Button,
    Box,
    chakra,
    Wrap,
    useRadio,
    useRadioGroup,
    Tag, useCheckboxGroup
} from '@chakra-ui/react'
import {ChevronDownIcon} from "@chakra-ui/icons";
import CustomCheckbox from "./customCheckbox"
import {useState} from "react";


const FilterSection = ({tags}) => {
    const handleChange = () => {console.log(value)}
    const clearFilters = () => {}
    const [showAll, setShowAll] = useState(false)

    const { value, getCheckboxProps } = useCheckboxGroup({
        onChange: handleChange,
    })
    tags = ['dessert', 'cookies', 'ice cream']
    return (
        <Wrap >
            {tags.map((tag, index) => {
                if (!showAll) {
                    if (index == 2) {
                        return <Tag cursor="pointer" key="0" onClick={setShowAll}>...</Tag>
                    }
                    else if (index > 2) {
                        return;
                    }
                }
                return <CustomCheckbox label={tag} {...getCheckboxProps({ value: tag })}/>
            })}
        </Wrap>
    )
}

export default FilterSection