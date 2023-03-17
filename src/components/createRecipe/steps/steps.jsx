import {useState} from "react";
import StepList from "./stepList";
import StepInput from "./stepInput";


const Steps = ({addStep, removeStep, steps, editStep}) => {


    return(
        <>
            <StepList steps={steps} removeStep={removeStep} editStep={editStep}/>
            <StepInput addStep={addStep}/>
        </>
    )
}

export default Steps