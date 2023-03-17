import {Alert, AlertDescription, AlertIcon, AlertTitle, Button, Link} from "@chakra-ui/react";
import {Link as ReactRouterLink, useNavigate} from 'react-router-dom'

const ErrorPage = () => {
    return (
        <>

            <Alert status='error'>
                <AlertIcon/>
                <AlertTitle>Something went wrong! Sorry for the inconvenience.</AlertTitle>
                <Link as={ReactRouterLink} to='/'>
                    <Button colorScheme="red">
                        Go back home
                    </Button>
                </Link>
            </Alert>
        </>
    )
}

export default ErrorPage