import {chakra, Tag, useCheckbox, useRadio} from "@chakra-ui/react";

const CustomCheckbox = ({label, ...radioProps}) => {
    const { state, getInputProps, getCheckboxProps, htmlProps, getLabelProps } = useCheckbox(radioProps)
    return (
        <chakra.label {...htmlProps} cursor='pointer' key="tag">
            <input {...getInputProps({})} hidden />
            <Tag {...getCheckboxProps()} colorScheme={state.isChecked ? 'orange' : 'grey'}>
                {label}
            </Tag>
        </chakra.label>
    )
}

export default CustomCheckbox