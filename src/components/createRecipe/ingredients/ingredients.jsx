import {useState} from "react";
import IngredientList from "./ingredientList";
import IngredientInput from "./ingredientInput";


const Ingredients = ({addIngredient, removeIngredient, ingredients, editIngredient}) => {

    return (
        <>
            <IngredientList ingredients={ingredients} removeIngredient={removeIngredient} editIngredient={editIngredient}/>
            <IngredientInput addIngredient={addIngredient}/>
        </>
    )
}

export default Ingredients