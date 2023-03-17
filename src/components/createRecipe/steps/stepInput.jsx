import {Flex, FormControl, IconButton, Input, Textarea} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";
import {useState} from "react";


const StepInput = ({addStep}) => {
    const [inputValue, setInputValue] = useState("");

    const keyUpHandler = (e) => {
        if (e.key === 'Enter') {
            e.stopPropagation()
            submit()
        }
    }

    const submit = () => {
        addStep(inputValue);
        setInputValue('')
    }

    return (
        <Flex alignItems={"start"}>
            <Textarea
                value={inputValue}
                onChange={e => {setInputValue(e.target.value)}}
                onBlur={submit}
                onKeyUp={keyUpHandler}
                size={"sm"}
                height={"40px"}
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

export default StepInput