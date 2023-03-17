import {useState} from "react";
import {Flex, IconButton, Input, InputGroup, InputRightAddon, Textarea} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";


const TagInput = ({addTag}) => {
    const [inputValue, setInputValue] = useState("");

    const keyUpHandler = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            e.stopPropagation()
            submit()
        }
    }

    const submit = () => {
        addTag(inputValue);
        setInputValue('')
    }

    return (
        <InputGroup>
            <Input
                value={inputValue}
                onChange={e => {
                    setInputValue(e.target.value)
                }}
                onBlur={submit}
                onKeyDown={keyUpHandler}
            />
            <InputRightAddon bg={'none'}>
                <IconButton
                    aria-label={'add step'}
                    icon={<AddIcon/>}
                    onClick={submit}
                    variant={'link'}
                    color={"primary.500"}
                />
            </InputRightAddon>
        </InputGroup>
    )
}

export default TagInput