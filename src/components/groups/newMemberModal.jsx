import {
    Alert, AlertTitle,
    Avatar,
    AvatarGroup, Button, Flex,
    FormControl, FormLabel, Input, InputGroup, InputLeftElement,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, Spacer, Text, useToast, VStack
} from "@chakra-ui/react";
import {CloseIcon, Search2Icon} from "@chakra-ui/icons";
import {useEffect, useRef, useState} from "react";
import useHttp from "../../util/use-http";
import {useNavigate} from "react-router-dom";


const NewMemberModal = ({isOpen, onClose, groupInfo, reload}) => {
    const navigate = useNavigate();
    const searchRef = useRef();
    const [members, setMembers] = useState({members: []})
    const [searchResults, setSearchResults] = useState({})
    const {isLoading, error, sendRequest} = useHttp();
    const toast = useToast()

    useEffect(() => {
        if (error) {
            toast({
                title: "An error occurred.",
                description: error,
                status: "error",
                duration: 9000,
                isClosable: true,
            })
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        sendRequest({
            url: `${process.env.REACT_APP_SERVER_URL}/group/addMembers`,
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: {
                groupId: groupInfo._id,
                memberIds: members.members.map(m => m._id)
            }
        }, result => {
            if (!error){
                setMembers({members: []})
                onClose()
                toast({
                    title: "Members added.",
                    description: "Members have been added to the group.",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                })
            }
        })
    }

    const handleSearch = (e) => {
        const query = e.target.value;
        if (!query) {
            setSearchResults({searchResults: []})
            return;
        }
        sendRequest({
            url: `${process.env.REACT_APP_SERVER_URL}/user/search/?query=${query}`,
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }, (result) => {
            if (!error) {
                console.log(result)
                //remove users from search results if they are already part of the group
                const filtered = result.users.filter(u => !groupInfo.members.map(m => m._id).includes(u._id) )
                setSearchResults({searchResults: filtered})
            }
        })
    }

    const addMember = (member) => {
        if (members.members.filter(m => m._id == member._id).length > 0) {
            return;
        }
        const temp = members.members;
        temp.push(member);
        setMembers({members: temp});
        setSearchResults({searchResults: []})
        searchRef.current.value = ''
    }

    const removeMember = (member) => {
        const temp = members.members;
        setMembers({members: temp.filter(m => m._id !== member._id)})
        setSearchResults({searchResults: []})
        searchRef.current.value = ''
    }

    return (
        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent>
                {error && <Alert><AlertTitle>There was a problem. Try again later.</AlertTitle></Alert>}
                <ModalHeader>Invite Member</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <FormControl mb={2} mt={4}>
                        <FormLabel mb={0}>Add Members</FormLabel>
                        <AvatarGroup my={members.members?.length > 0 && 3} max={10}>
                            {members.members?.map((member, index) => {
                                return <Avatar key={index} name={member.username}/>
                            })}
                        </AvatarGroup>
                        <InputGroup>
                            <Input
                                ref={searchRef}
                                placeholder="search by username"
                                borderRadius={"none"}
                                onKeyDown={(e) => {
                                    handleSearch(e);
                                }}
                            />
                            <InputLeftElement children={<Search2Icon/>}/>
                        </InputGroup>
                        <VStack border={"1px solid lightgrey"} p={3} p={!members.members && 0} alignItems={"left"}>
                            {isLoading && <p>loading...</p>}
                            {searchResults.searchResults?.map((user, index) => {
                                const alreadyAdded = members.members.filter(m => m._id === user._id).length > 0
                                return (
                                    <Flex
                                        key={index}
                                        alignItems={"center"}
                                        p={2}
                                        m={2}
                                        _hover={{
                                            background: "lightGrey",
                                            cursor: "pointer"
                                        }}
                                        onClick={() => {
                                            console.log(alreadyAdded)
                                            if (alreadyAdded) {
                                                removeMember(user)
                                            } else {
                                                addMember(user)
                                            }
                                        }}
                                    >
                                        <Avatar name={user.username} mr={3} size={"sm"}/>
                                        <Text>{user.username}</Text>
                                        <Spacer/>
                                        {alreadyAdded && <CloseIcon/>}
                                    </Flex>
                                )
                            })}
                        </VStack>
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
                        Add
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default NewMemberModal