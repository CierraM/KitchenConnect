import SignupForm from '../components/auth/signupForm';
import LoginForm from '../components/auth/loginForm';
import Template from "../components/ui/template";
import {useAtom} from "jotai";
import {userTokenAtom} from "../store/atoms";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {Box, Flex, Heading} from "@chakra-ui/react";

const Auth = ({isSignup}) => {
    const [userToken, setUserToken] = useAtom(userTokenAtom);
    const navigate = useNavigate();

    useEffect(() => {
        if (userToken) {
            navigate('/myRecipes');
        }
    })

    return (
        <Flex
            bg={'linear-gradient(145deg, rgba(207,85,85,1) 0%, rgba(224,152,62,1) 100%)'}
            h={'100%'}
            flexDir={'column'}
        >
            <Box m={"auto"} maxW={'600px'} >
                {isSignup ?
                    <Box shadow={'lg'} mx={'10px'}>
                        <SignupForm/>
                    </Box>
                    :
                    <Box shadow={'lg'} mx={'10px'}>
                        <LoginForm/>
                    </Box>

                }
            </Box>
        </Flex>
    )
}

export default Auth;