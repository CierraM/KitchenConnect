import {useState} from "react";
import StepList from "./stepList";
import StepInput from "./stepInput";


const Steps = ({addStep, removeStep, steps}) => {


    return(
        <>
            <StepList steps={steps} removeStep={removeStep}/>
            <StepInput addStep={addStep}/>
        </>
    )
}

export default Steps