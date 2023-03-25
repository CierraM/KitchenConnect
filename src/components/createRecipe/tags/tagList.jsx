import {Flex, Spacer, TagCloseButton, Text, Tag, Wrap} from "@chakra-ui/react";
import {SmallCloseIcon} from "@chakra-ui/icons";


const TagList = ({tags, removeTag}) => {
    return (<Wrap mt={2}>
            {tags.map((tag, index) => {
                return (
                    <Tag key={index} mr={2} colorScheme="primary">
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
        </Wrap>
    )
}

export default TagList