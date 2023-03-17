import {Flex, FormControl, IconButton, Input} from "@chakra-ui/react";
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
        console.log('add ingredient')
        addIngredient(inputValue);
        setInputValue('')
    }

    return (
        <Flex>
            <Input
                value={inputValue}
                onChange={e => {setInputValue(e.target.value)}}
                onBlur={submit}
                onKeyDown={keyUpHandler}
            />
            <IconButton
                aria-label={'add ingredient'}
                icon={<AddIcon/>}
                onClick={submit}
                variant={'link'}
                color={"primary.500"}
            />
        </Flex>
    )
}

export default IngredientInput