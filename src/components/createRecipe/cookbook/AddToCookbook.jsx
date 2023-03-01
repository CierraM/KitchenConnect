import {Checkbox, CheckboxGroup, Stack, useCheckbox} from "@chakra-ui/react";


const AddToCookbook = ({cookbooks}) => {
    const { state, getCheckboxProps, getInputProps, getLabelProps, htmlProps } = useCheckbox()

    return (
        <CheckboxGroup name={"cookbooks"}
        >
            {cookbooks.map((cookbook, index) => {
                return (
                    <Checkbox key={index} value={cookbook._id}>{cookbook.title}</Checkbox>
                )
            })}
        </CheckboxGroup>
    )
}

export default AddToCookbook