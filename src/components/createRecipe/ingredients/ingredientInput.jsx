import {Flex, FormControl, IconButton, Input} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";
import {useState} from "react";


const IngredientInput = ({addIngredient}) => {
    const [inputValue, setInputValue] = useState("");

    const submit = () => {
        addIngredient(inputValue);
        setInputValue('')
    }

    return (
        <Flex>
            <Input value={inputValue} onChange={e => {setInputValue(e.target.value)}}/>
            <IconButton aria-label={'add ingredient'} icon={<AddIcon/>} onClick={submit} />
        </Flex>
    )
}

export default IngredientInput