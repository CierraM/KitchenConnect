import {useState} from "react";
import {Flex, IconButton, Input, Textarea} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";


const TagInput = ({addTag}) => {
    const [inputValue, setInputValue] = useState("");

    const keyUpHandler = (e) => {
        if (e.key === 'Enter') {
            e.stopPropagation()
            submit()
        }
    }

    const submit = () => {
        addTag(inputValue);
        setInputValue('')
    }

    return (
        <Flex>
            <Input
                value={inputValue}
                onChange={e => {setInputValue(e.target.value)}}
                onBlur={submit}
                onKeyUp={keyUpHandler}
            />
            <IconButton
                aria-label={'add step'}
                icon={<AddIcon/>}
                onClick={submit}
                variant={'link'}
                color={"primary.500"}
            />
        </Flex>
    )
}

export default TagInput