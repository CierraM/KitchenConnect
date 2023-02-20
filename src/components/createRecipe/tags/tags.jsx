import {useState} from "react";
import StepList from "../steps/stepList";
import StepInput from "../steps/stepInput";
import TagList from "./tagList";
import TagInput from "./tagInput";


const Tags = ({addTag, removeTag, tags}) => {

    return (
        <>
            <TagInput addTag={addTag}/>
            <TagList tags={tags} removeTag={removeTag}/>
        </>
    )
}

export default Tags