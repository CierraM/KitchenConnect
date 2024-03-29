import {
    Wrap,
    Tag, useCheckboxGroup
} from '@chakra-ui/react'
import CustomCheckbox from "./customCheckbox"
import {useState} from "react";


const FilterSection = ({tags, filterHandler}) => {
    const clearFilters = () => {}
    const [showAll, setShowAll] = useState(false)

    const { value, getCheckboxProps } = useCheckboxGroup({
        onChange: filterHandler,
    })
    return (
        <Wrap py={2}>
            {tags?.map((tag, index) => {
                if (!showAll) {
                    if (index == 5) {
                        return <Tag
                            cursor="pointer"
                            key="-1"
                            onClick={setShowAll}
                            colorScheme={"primary"}
                            variant={"outline"}
                        >...</Tag>
                    }
                    else if (index > 5) {
                        return;
                    }
                }
                return <CustomCheckbox key={index} label={tag} {...getCheckboxProps({ value: tag })}/>
            })}
        </Wrap>
    )
}

export default FilterSection