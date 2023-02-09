
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    Box,
    Link,
    Heading
} from '@chakra-ui/react'
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import PasswordInput from './passwordInput';
import React, { useRef } from 'react';

const SignupForm = () => {
    const usernameInputRef = useRef();
    const passwordInputRef = useRef();
    const confirmPasswordInputRef = useRef();
    const emailInputText = useRef();
    const firstNameInputRef = useRef();
    const lastNameInputRef = useRef();
    const navigate = useNavigate();

    const trySignup = () => {

    }

    //TODO: field validation
    return (
        <Box >

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
                        <Input placeholder='John' ref={firstNameInputRef} />
                    </FormControl>
                </Box>
                <Box m={3}>
                    <FormControl>
                        <FormLabel mb={0}> Last Name </FormLabel>
                        <Input placeholder='Doe' ref={lastNameInputRef} />
                    </FormControl>
                </Box>
                <Box m={3}>
                    <FormControl isRequired>
                        <FormLabel mb={0}> Email </FormLabel>
                        <Input placeholder='example@example.com' ref={emailInputText} />
                    </FormControl>
                </Box>
                <Box m={3}>
                    <FormControl isRequired>
                        <FormLabel mb={0}> Username </FormLabel>
                        <Input placeholder='Username' ref={usernameInputRef} />
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
                    <Button type="submit" onSubmit={trySignup} borderRadius="10" onClick={trySignup}>Create Account</Button>
                </Box>
                <Box m={6}>
                    <Link as={ReactRouterLink} to={'/login'}>Already have an account? Click Here.</Link>
                </Box>
            </Box>
        </Box>
    );
}

export default SignupForm;