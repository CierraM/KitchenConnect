import {
    Avatar, AvatarGroup,
    Box,
    Button, Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    InputGroup,
    InputLeftElement, Spacer, Spinner,
    Text, useToast, VStack,
    Wrap
} from "@chakra-ui/react";
import RelatedRecipeTag from "../components/createRecipe/relatedRecipeTag";
import {CloseIcon, Search2Icon} from "@chakra-ui/icons";
import {useState, useRef, useEffect} from "react";
import useHttp from "../util/use-http";
import {useNavigate} from "react-router-dom";
import Template from "../components/ui/template";


const CreateGroup = () => {
    const titleInputRef = useRef();
    const searchRef = useRef();
    const [members, setMembers] = useState({members: []})
    const [searchResults, setSearchResults] = useState({})
    const {isLoading, error, sendRequest} = useHttp();
    const navigate = useNavigate();
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
            url: `${process.env.REACT_APP_SERVER_URL}/group/create`,
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: {
                groupName: titleInputRef.current.value
            }
        }, result => {
            if (!error) {
                sendRequest({
                    url: `${process.env.REACT_APP_SERVER_URL}/group/addMembers`,
                    method: 'PATCH',
                    headers: {'Content-Type': 'application/json'},
                    body: {
                        groupId: result._id,
                        memberIds: members.members.map(m => m._id)
                    }
                }, (membersResult => {
                    if (!error) {
                        toast({
                            title: "Group created.",
                            description: "Group has been created.",
                            status: "success",
                            duration: 9000,
                            isClosable: true,
                        })
                        navigate('/group/' + result._id)
                    }
                }))
            }
        })
    }

    const handleSearch = (e) => {
        e.preventDefault()
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
                setSearchResults({searchResults: result.users})
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
        <Template>
            <Box p={3}>
                <Heading>New Group</Heading>
                <form onSubmit={handleSubmit}>
                    <FormControl mb={2}>
                        <FormLabel mb={0}>Name</FormLabel>
                        <Input type={"text"} ref={titleInputRef}/>
                    </FormControl>
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
                                onChange={(e) => {
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
                    <Flex justifyContent={"flex-end"}>
                        <Button
                            type="button"
                            colorScheme="grey"
                            variant={'outline'}
                            mr={3}
                            onClick={() => {
                                navigate(-1)
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type={"submit"}
                            colorScheme="blue"
                            disabled={isLoading}
                            isLoading={isLoading}
                        >
                            Create Group
                        </Button>

                    </Flex>
                </form>
            </Box>
        </Template>
    )
}

export default CreateGroup