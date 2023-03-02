import {
    FormControl,
    FormLabel,
    Input,
    Button,
    Box,
    Link,
    Heading
} from '@chakra-ui/react'
import {Link as ReactRouterLink, useNavigate} from 'react-router-dom';
import PasswordInput from './passwordInput';
import React, {useRef} from 'react';
import useHttp from "../../util/use-http";

const SignupForm = () => {
    const usernameInputRef = useRef();
    const passwordInputRef = useRef();
    const confirmPasswordInputRef = useRef();
    const emailInputRef = useRef();
    const firstNameInputRef = useRef();
    const lastNameInputRef = useRef();
    const navigate = useNavigate();
    const {isLoading, error, sendRequest} = useHttp();

    const trySignup = (e) => {
        e.preventDefault()
        const request = {
            email: emailInputRef.current.value,
            password: passwordInputRef.current.value
        }
        sendRequest({
            url: `${process.env.REACT_APP_SERVER_URL}/user/signup`,
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: request
        }, response => {
            if (!error) {
                navigate('/myRecipes')
            }
        })
    }

    //TODO: field validation
    return (
        <Box>
            <form onSubmit={trySignup}>
                <Box m={"auto"}
                     px='4'
                     py='3'
                     bg='white'
                     alignItems='center'
                     justifyContent='center'
                     textAlign='center'>
                    <Heading mb={'lg'}>Create Your Account</Heading>
                    <Box m={3}>
                        <FormControl>
                            <FormLabel mb={0}> First Name </FormLabel>
                            <Input placeholder='John' ref={firstNameInputRef}/>
                        </FormControl>
                    </Box>
                    <Box m={3}>
                        <FormControl>
                            <FormLabel mb={0}> Last Name </FormLabel>
                            <Input placeholder='Doe' ref={lastNameInputRef}/>
                        </FormControl>
                    </Box>
                    <Box m={3}>
                        <FormControl isRequired>
                            <FormLabel mb={0}> Email </FormLabel>
                            <Input placeholder='example@example.com' ref={emailInputRef}/>
                        </FormControl>
                    </Box>
                    <Box m={3}>
                        <FormControl isRequired>
                            <FormLabel mb={0}> Username </FormLabel>
                            <Input placeholder='Username' ref={usernameInputRef}/>
                        </FormControl>
                    </Box>
                    <Box m={3}>
                        <FormControl isRequired>
                            <FormLabel mb={0}>Password</FormLabel>
                            <PasswordInput ref={passwordInputRef}></PasswordInput>
                        </FormControl>
                    </Box>
                    <Box m={3}>
                        <FormControl isRequired>
                            <FormLabel mb={0}>Confirm Password</FormLabel>
                            <PasswordInput ref={confirmPasswordInputRef}></PasswordInput>
                        </FormControl>
                    </Box>
                    <Box>
                        <Button type="submit" onSubmit={trySignup} borderRadius="10" >Create
                            Account</Button>
                    </Box>
                    <Box m={6}>
                        <Link as={ReactRouterLink} to={'/login'}>Already have an account? Click Here.</Link>
                    </Box>
                </Box>
            </form>
        </Box>
    );
}

export default SignupForm;