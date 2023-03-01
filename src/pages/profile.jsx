//page for viewing user data, friends, groups, etc

import Template from "../components/ui/template";
import {Avatar, Box, Editable, EditableInput, EditablePreview, Flex, FormLabel, Heading} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import useHttp from "../util/use-http";

const Profile = () => {
    const {isLoading, error, sendRequest} = useHttp()
    const [user, setUser] = useState({})

    useEffect(() => {
        sendRequest({
            url: `${process.env.REACT_APP_SERVER_URL}/user`,
            method: 'GET'
        }, result => {
            setUser(result.user);
        })
    }, [sendRequest])

    return (
        <Template>
            <Box p={3}>
            <Heading>Profile</Heading>
                <Flex flexDirection={"row"} py={3}>
                    <Avatar size="2xl" name={user.username}/>
                    <Flex flexDirection={'column'}>
                    </Flex>
                </Flex>

            </Box>
        </Template>
    )
}

export default Profile