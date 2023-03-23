import {Flex, FormControl, IconButton, Input, InputGroup, InputRightAddon, Textarea} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";
import {useEffect, useState} from "react";
import ingredients from "./ingredients";


const IngredientInput = ({addIngredient}) => {
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
        let ingredients = inputValue.split(/\r?\n|\r|\n/g).filter(ingredient => ingredient.trim() !== '')
        ingredients.forEach(ingredient => {
            addIngredient(ingredient);
        })
        setInputValue('')
    }


    return (
        <InputGroup>
            <Textarea
                height={10}
                minHeight={10}
                value={inputValue}
                onChange={e => {
                    setInputValue(e.target.value)
                }}
                onBlur={submit}
                onPaste={(e) => pasteHandler(e)}
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