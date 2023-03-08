import {
    Avatar,
    Button, Flex, Input, InputGroup, InputLeftElement,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay, Spacer, Text, Wrap
} from "@chakra-ui/react";
import {useEffect, useState, useRef} from "react";
import useHttp from "../../util/use-http";
import {useNavigate} from "react-router-dom";
import List from "../myRecipes/list";
import {CloseIcon, Search2Icon} from "@chakra-ui/icons";
import SearchBar from "./searchBar";


const ShareModal = ({isOpen, closeHandler, title, resourceList, shareResource}) => {
    const [resourcesToShare, setResourcesToShare] = useState({resources: []})
    const [searchResults, setSearchResults] = useState({searchResults: []})

    const handleSearch = (e, value) => {
        e.preventDefault();
        setSearchResults({searchResults: resourceList
                .filter(r => r.title?.toLowerCase()
                                        .includes(value.toLowerCase()) || r.name?.toLowerCase().includes(value.toLowerCase()))})
    }

    const onClose = () => {
        closeHandler()
        setResourcesToShare({resources: []})
        setSearchResults({searchResults: []})
    }

    const addResource = (item) => {
        const temp = resourcesToShare.resources;
        temp.push(item);
        setResourcesToShare({resources: temp});
        setSearchResults({searchResults: []})
    }

    const removeResource = (item) => {
        const temp = resourcesToShare.resources;
        setResourcesToShare({resources: temp.filter(m => m._id !== item._id)})
        setSearchResults({searchResults: []})
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Wrap>
                            {resourcesToShare.resources.map((item, index) => {
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
                                        onClick={() => removeResource(item)}
                                    >
                                        <Text>{item.title || item.name}</Text>
                                        <Spacer/>
                                        <CloseIcon pl={1} size={"sm"}/>
                                    </Flex>
                                )
                            })}
                        </Wrap>
                        <SearchBar searchHandler={handleSearch}/>
                        {searchResults.searchResults?.map((item, index) => {
                            const alreadyAdded = resourcesToShare.resources.filter(r => r._id === item._id).length > 0
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
                                        if (!alreadyAdded) {
                                            addResource(item)
                                        } else {
                                            removeResource(item)
                                        }
                                    }}
                                >
                                    <Text>{item.title || item.name}</Text>
                                    <Spacer/>
                                    {alreadyAdded && <CloseIcon/>}
                                </Flex>
                            )
                        })}
                    </ModalBody>

                    <ModalFooter>
                        <Button type="button" variant='solid' onClick={() => {
                            shareResource(resourcesToShare.resources)
                            onClose()
                        }}>Share</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ShareModal;