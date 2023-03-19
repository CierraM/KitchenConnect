import SignupForm from '../components/auth/signupForm';
import LoginForm from '../components/auth/loginForm';
import Template from "../components/ui/template";
import {useAtom} from "jotai";
import {userTokenAtom} from "../store/atoms";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {Box, Heading} from "@chakra-ui/react";

const Auth = ({isSignup}) => {
    const [userToken, setUserToken] = useAtom(userTokenAtom);
    const navigate = useNavigate();

    useEffect(() => {
        if (userToken) {
            navigate('/myRecipes');
        }
    })

    return (
        <Box margin={"auto"} maxW={'600px'}>
            <Heading align={"center"} my={5}>Kitchen Connect</Heading>
            {   isSignup ?
                <SignupForm />
                :
                <LoginForm />

            }
        </Box>
    )
}

export default Auth;