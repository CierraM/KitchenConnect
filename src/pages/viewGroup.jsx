import Template from "../components/ui/template";
import {
    Avatar,
    AvatarGroup,
    Button,
    Flex, FormControl, FormLabel,
    Heading, Input, InputGroup, InputLeftElement,
    Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader,
    ModalOverlay, Spacer, Text,
    Tooltip,
    useDisclosure, VStack
} from "@chakra-ui/react";
import {useNavigate, useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import useHttp from "../util/use-http";
import {BiExit} from "react-icons/bi";
import {BsPersonPlus} from "react-icons/bs";
import {CloseIcon, Search2Icon} from "@chakra-ui/icons";
import NewMemberModal from "../components/groups/newMemberModal";
import RecipeBrowser from "../components/myRecipes/recipeBrowser";
import FilterSection from "../components/myRecipes/filterButton";
import List from "../components/myRecipes/List";
import GroupRecipeAddButton from "../components/groups/groupRecipeAddButton";

const ViewGroup = () => {
    const {id} = useParams()
    const [groupInfo, setGroupInfo] = useState({})
    const [recipes, setRecipes] = useState({recipes: []})
    const [cookbooks, setCookbooks] = useState({cookbooks: []})
    const {sendRequest, isLoading, error} = useHttp()
    const {isOpen, onOpen, onClose} = useDisclosure()
    const navigate = useNavigate();



    useEffect(() => {
        sendRequest({
            url: `${process.env.REACT_APP_SERVER_URL}/group/userGroups`,
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }, response => {
            if (!error) {
                const group = response.groups.filter(g => g._id === id)[0]
                setGroupInfo(group)
            }
        })
    }, [error, id, sendRequest])

    //Get recipes from server
    useEffect(() => {
        if (groupInfo._id) {
            sendRequest({
                url: `${process.env.REACT_APP_SERVER_URL}/group/${groupInfo._id}/getRecipes`,
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            }, response => {
                if (!error) {
                    const cookbookRecipes = [].concat.apply([], response.cookbooks.map(c => c.recipes))
                    const allRecipes = response.recipes.concat(cookbookRecipes)
                        .filter((v, i, a) => i === a.findIndex(t => (t._id === v._id)))
                    setRecipes({recipes: allRecipes})
                    setCookbooks({cookbooks: response.cookbooks})
                }
            })
        }
    }, [error, sendRequest, setRecipes])

    const leaveGroup = () => {
        sendRequest({
            url: `${process.env.REACT_APP_SERVER_URL}/group/removeMember`,
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: {
                groupId: groupInfo._id,
            }
        }, (result => {
            if (!error) {
                navigate('/')
            }
        }))
    }

    const recipeTabContent = (
        <>
            <FilterSection></FilterSection>
            <List items={recipes?.recipes} type={"recipe"}/>
        </>
    )

    const cookbookTabContent = (
        <List items={cookbooks?.cookbooks} type={"cookbook"}/>
    )

    return (
        <Template>
            <Flex alignItems={"center"} justify={"space-between"}>
                <Heading my={3}>{groupInfo.name}</Heading>
                <Button
                    type="button"
                    rightIcon={<BiExit/>}
                    onClick={leaveGroup}
                    variant={"outline"}
                    colorScheme="red"
                    size={"sm"}
                >Leave Group</Button>
            </Flex>
            <Flex>
                <AvatarGroup max={10}>
                    {groupInfo?.members?.map((m, index) => {
                        return (
                            <Tooltip label={m.username} key={index}>
                                <Avatar name={m.username} mr={1}/>
                            </Tooltip>
                        )
                    })}
                </AvatarGroup>
                <Button ml={3} leftIcon={<BsPersonPlus/>} onClick={onOpen} variant={"outline"}>Invite</Button>
            </Flex>
            <RecipeBrowser recipeTabContent={recipeTabContent} cookbookTabContent={cookbookTabContent}>
                <GroupRecipeAddButton/>
            </RecipeBrowser>
            <NewMemberModal onClose={onClose} isOpen={isOpen} groupInfo={groupInfo}/>
        </Template>
    )
}

export default ViewGroup