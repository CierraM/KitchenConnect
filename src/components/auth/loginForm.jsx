import {
    FormControl,
    FormLabel,
    Input,
    Button,
    Box,
    Link,
    Spinner,
    Text,
    Image,
    Heading, useToast
} from '@chakra-ui/react'
import React, {useRef, useEffect} from 'react';
import PasswordInput from './passwordInput';
import {Link as ReactRouterLink, useNavigate} from 'react-router-dom';
import useHttp from '../../util/use-http';
import {useAtom} from "jotai";
import {userTokenAtom} from "../../store/atoms";

const LoginForm = () => {
    const navigate = useNavigate();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const [userToken, setUserToken] = useAtom(userTokenAtom);
    const toast = useToast();

    const {isLoading, error, sendRequest} = useHttp();
    const tryLogin = (e) => {
        e.preventDefault()
        const request = {
            email: emailInputRef.current.value,
            password: passwordInputRef.current.value
        }
        sendRequest({
            url: `${process.env.REACT_APP_SERVER_URL}/user/login`,
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: request
        }, response => {
            if (response.status === 200) {
                setUserToken(response.token)
                navigate('/myRecipes')
            } else {
                toast({
                    title: "Login failed",
                    description: "Invalid username/password",
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                })
            }
        })
    }

    return (
        <Box >
            <Box
                m="auto"
                py='3'
                px='4'
                bg='white'
                alignItems='center'
                justifyContent='center'
                textAlign='center'>
                <Heading align={"center"} py={5} color={'primary.600'} fontFamily={'accent'} fontSize={'3em'}>Kitchen Connect</Heading>
                <form onSubmit={tryLogin}>
                    <Box m={2} mb={4}>
                        <FormControl isRequired>
                            <FormLabel mb={'4px'}> Email </FormLabel>
                            <Input placeholder='Email' ref={emailInputRef}/>
                        </FormControl>
                    </Box>
                    <Box m={2} mb={8}>
                        <FormControl isRequired>
                            <FormLabel mb={'4px'}>Password</FormLabel>
                            <PasswordInput ref={passwordInputRef}></PasswordInput>
                        </FormControl>
                        {
                            error && <Text color="red">Invalid username/password</Text>
                        }
                    </Box>
                    <Box>
                        {isLoading
                            ?
                            <Spinner/>
                            :
                            <Button
                                type="submit"
                                borderRadius="10"
                                isLoading={isLoading}
                                colorScheme={'blue'}
                                disabled={isLoading}
                            >Login</Button>
                        }

                    </Box>
                </form>
                <Box m={6}>
                    <Link as={ReactRouterLink} to={'/signup'}>Don't have an account? Click Here.</Link>
                </Box>
            </Box>
        </Box>
    );

}


export default LoginForm;
