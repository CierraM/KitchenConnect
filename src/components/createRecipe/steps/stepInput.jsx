import {Flex, FormControl, IconButton, Input, Textarea} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";
import {useState} from "react";


const StepInput = ({addStep}) => {
    const [inputValue, setInputValue] = useState("");

    const keyUpHandler = (e) => {
        if (e.key === 'Enter') {
            submit()
            e.stopPropagation()
        }
    }

    const submit = () => {
        addStep(inputValue);
        setInputValue('')
    }

    return (
        <Flex>
            <Textarea
                value={inputValue}
                onChange={e => {setInputValue(e.target.value)}}
                onBlur={submit}
                onKeyUp={keyUpHandler}
            />
            <IconButton aria-label={'add step'} icon={<AddIcon/>} onClick={submit} />
        </Flex>
    )
}

export default StepInput