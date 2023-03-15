import {ChakraProvider, extendTheme} from '@chakra-ui/react'
import MyRecipes from './pages/myRecipes';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate, Redirect
} from "react-router-dom";
import Auth from './pages/auth';
import ViewRecipe from "./pages/viewRecipe";
import ViewCookbook from "./pages/viewCookbook";
import Cookbooks from "./pages/cookbooks";
import CreateRecipe from "./pages/createRecipe";
import CreateCookbook from "./pages/createCookbook";
import Profile from "./pages/profile";
import CreateGroup from "./pages/createGroup";
import ViewGroup from "./pages/viewGroup";
import {useAtom} from "jotai";
import {userTokenAtom} from "./store/atoms";

function App() {
    const theme = extendTheme({
        colors: {
            main: {
                // 500: "#FFFFFF",
                500: "black"
            },
            secondary: {
                // 500: "#ff5a5f",
                // 600: "#e95a5f",
                // 700: "#d95a5f",
                // 800: "#c95a5f",
                // 900: "#b95a5f",
                500: "white",
            },
            accent: {
                50: "#f9f9f9",
                100: "#f4f4f4",
                200: "#e9e9e9",
                300: "#dedede",
                400: "#d3d3d3",
                500: "#151e3f",
                600: "#1a2446",
                700: "#1f2a4d",
                800: "#242f54",
                900: "#29345b",
            }
        }
    })

    const [userToken, setUserToken] = useAtom(userTokenAtom);
    return (
        <ChakraProvider theme={theme}>
            <Router>
                {userToken ? (
                    <Routes>
                        <Route path="/myRecipes" element={<MyRecipes/>}/>
                        <Route path="/profile" element={<Profile/>}/>
                        <Route path="/group/create" element={<CreateGroup/>}/>
                        <Route path="/createCookbook" element={<CreateCookbook editing={false}/>}/>
                        <Route path="/createRecipe" element={<CreateRecipe editing={false}/>}/>
                        <Route path="/cookbook/:id/edit" element={<CreateCookbook editing={true}/>}/>
                        <Route path={"/recipe/:id/edit"} element={<CreateRecipe editing={true}/>}/>
                        <Route path="/group/:id" element={<ViewGroup/>}/>
                        <Route path="/" element={<MyRecipes/>}/>
                        <Route path="*" element={<MyRecipes/>}/>

                        <Route path="/recipe/:id" element={<ViewRecipe/>}/>
                        <Route path="/cookbook/:id" element={<ViewCookbook/>}/>
                        <Route path="/login" element={<Auth isSignup={false}/>}/>
                        <Route path="/signup" element={<Auth isSignup={true}/>}/>
                        <Route path="/error"/>
                    </Routes>
                ) : (
                    <Routes>
                        <Route path="/login" element={<Auth isSignup={false}/>}/>
                        <Route path="/signup" element={<Auth isSignup={true}/>}/>
                        <Route path="*" element={<Auth/>}/>
                        <Route path="/recipe/:id" element={<ViewRecipe/>}/>
                        <Route path="/cookbook/:id" element={<ViewCookbook/>}/>
                        <Route path="/error"/>
                    </Routes>
                )}
            </Router>
        </ChakraProvider>
    );
}

export default App;
