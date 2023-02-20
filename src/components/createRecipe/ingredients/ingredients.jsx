import {useState} from "react";
import IngredientList from "./ingredientList";
import IngredientInput from "./ingredientInput";


const Ingredients = ({addIngredient, removeIngredient, ingredients}) => {

    return (
        <>
            <IngredientList ingredients={ingredients} removeIngredient={removeIngredient}/>
            <IngredientInput addIngredient={addIngredient}/>
        </>
    )
}

export default Ingredients