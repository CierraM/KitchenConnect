import SignupForm from '../components/auth/signupForm';
import LoginForm from '../components/auth/loginForm';

const Auth = ({isSignup}) => {
    return (
        <>
            {   isSignup ?
                <SignupForm />
                :
                <LoginForm />

            }
            
            
        </>
    )
}

export default Auth;