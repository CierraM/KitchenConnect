import {Flex, FormControl, IconButton, Input, InputGroup, InputRightAddon, Textarea} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";
import {useState} from "react";


const StepInput = ({addStep}) => {
    const [inputValue, setInputValue] = useState("");

    const keyUpHandler = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            e.stopPropagation()
            submit()
        }
    }

    const submit = () => {
        addStep(inputValue);
        setInputValue('')
    }

    return (
        <InputGroup >
            <Textarea
                value={inputValue}
                onChange={e => {setInputValue(e.target.value)}}
                onBlur={submit}
                onKeyUp={keyUpHandler}
                size={"sm"}
                height={"40px"}
            />
            <InputRightAddon bg={'none'} height={''}>
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

export default StepInput