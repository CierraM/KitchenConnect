import {Flex, IconButton, ListItem, OrderedList, Spacer, TagCloseButton, Text, Tag} from "@chakra-ui/react";
import {SmallCloseIcon} from "@chakra-ui/icons";


const TagList = ({tags, removeTag}) => {
    return (<>
            {tags.map((tag, index) => {
                return (
                    <Tag key={index} mr={2} mt={2}>
                        <Flex alignItems={"center"}>
                            <Text>{tag}</Text>
                            <Spacer/>
                            <TagCloseButton aria-label={'delete'} icon={<SmallCloseIcon/>} onClick={(e) => {
                                removeTag(tag)
                            }}/>
                        </Flex>
                    </Tag>
                )
            })}
        </>
    )
}

export default TagList