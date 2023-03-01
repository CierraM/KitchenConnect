import {Alert, AlertDescription, AlertIcon, AlertTitle, Link} from "@chakra-ui/react";
import {Link as ReactRouterLink, useNavigate} from 'react-router-dom'

const ErrorPage = () => {
    const navigate = useNavigate();
    return (
        <>
            <Button onClick={() => navigate(-1)}>Back</Button>
            <Alert status='error'>
                <AlertIcon/>
                <AlertTitle>Your browser is outdated!</AlertTitle>
                <AlertDescription>Your Chakra experience may be degraded.</AlertDescription>
            </Alert>
        </>
)
}

export default ErrorPage