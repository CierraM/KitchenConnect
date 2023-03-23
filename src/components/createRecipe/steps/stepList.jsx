import {
    Flex,
    VStack,
    IconButton,
    Text,
    Spacer,
    OrderedList,
    ListItem,
    EditablePreview,
    EditableInput, Editable, EditableTextarea
} from "@chakra-ui/react";
import {CloseIcon, DeleteIcon, SmallCloseIcon} from "@chakra-ui/icons";


const StepList = ({steps, removeStep, editStep}) => {

    return (
        <OrderedList flexDirection={"column"} mb={3}  >
            {steps.map((step, index) => {
                return (
                    <ListItem key={index} _hover={{backgroundColor: '#e0e0e0'}} >
                        <Flex alignItems={"center"}>
                            <Editable value={step} w={'full'} onChange={(nextValue) => editStep(nextValue, index)}>
                                <EditablePreview w={'full'}/>
                                <EditableTextarea/>
                            </Editable>
                            <Spacer/>
                            <IconButton
                                aria-label={'delete'}
                                icon={<CloseIcon/>}
                                variant={'link'}
                                color={"primary.500"}
                                onClick={(e) => {
                                removeStep(step)
                            }}/>
                        </Flex>
                    </ListItem>
                )
            })}
        </OrderedList>
    )
}

export default StepList