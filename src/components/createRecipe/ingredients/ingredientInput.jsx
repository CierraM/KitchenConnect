import {Flex, FormControl, IconButton, Input, InputGroup, InputRightAddon} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";
import {useState} from "react";


const IngredientInput = ({addIngredient}) => {
    const [inputValue, setInputValue] = useState("");

    const keyUpHandler = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            e.stopPropagation()
            submit()
        }
    }

    const submit = () => {
        addIngredient(inputValue);
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
                        aria-label={'add ingredient'}
                        icon={<AddIcon/>}
                        onClick={submit}
                        variant={'link'}
                        color={"primary.500"}
                    />
                </InputRightAddon>
            </InputGroup>

    )
}

export default IngredientInput