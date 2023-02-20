import {Checkbox, CheckboxGroup, Stack} from "@chakra-ui/react";


const AddToCookbook = ({cookbooks}) => {
    return (
        <CheckboxGroup
        >
            {cookbooks.map((cookbook, index) => {
                return (
                    <Checkbox key={index}>{cookbook.title}</Checkbox>
                )
            })}
        </CheckboxGroup>
    )
}

export default AddToCookbook