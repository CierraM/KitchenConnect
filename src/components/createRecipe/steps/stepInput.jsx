import {Flex, FormControl, IconButton, Input, InputGroup, InputRightAddon, Textarea} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";
import {useState, useEffect} from "react";


const StepInput = ({addStep}) => {
    const [inputValue, setInputValue] = useState("");
    const [pasted, setPasted] = useState(false)

    const keyUpHandler = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            e.stopPropagation()
            submit()
        }
    }

    useEffect(() => {
        if (pasted) {
            setPasted(false)
            submit()
        }
    }, [inputValue])

    const pasteHandler = (e) => {
        e.preventDefault()
        setPasted(true)
        setInputValue(e.clipboardData.getData('Text'))

    }

    const submit = () => {
        let steps = inputValue.split(/\r?\n|\r|\n/g).filter(step => step.trim() !== '')
        steps.forEach(step => {
            addStep(step);
        })
        setInputValue('')
    }

    return (
        <InputGroup>
            <Textarea
                value={inputValue}
                onChange={e => {
                    setInputValue(e.target.value)
                }}
                onBlur={submit}
                onKeyUp={keyUpHandler}
                size={"sm"}
                height={"40px"}
                onPaste={(e) => pasteHandler(e)}
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

export default StepInput;