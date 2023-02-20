import {Flex, VStack, IconButton, Text, Spacer, OrderedList, ListItem} from "@chakra-ui/react";
import {DeleteIcon, SmallCloseIcon} from "@chakra-ui/icons";


const StepList = ({steps, removeStep}) => {

    return (
        <OrderedList w={"full"} flexDirection={"column"}>
            {steps.map((step, index) => {
                return (
                    <ListItem key={index}>
                        <Flex alignItems={"center"}>
                            <Text>{step}</Text>
                            <Spacer/>
                            <IconButton aria-label={'delete'} icon={<SmallCloseIcon/>} onClick={(e) => {
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