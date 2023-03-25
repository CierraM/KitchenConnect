
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