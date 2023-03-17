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
import Favorites from "./pages/favorites";
import colors from "./util/colors";
import ErrorPage from "./pages/error";


function App() {
    const theme = extendTheme({
        colors: colors
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
                        <Route path="/favorites" element={<Favorites/>}/>
                        <Route path="/" element={<MyRecipes/>}/>
                        <Route path="*" element={<MyRecipes/>}/>

                        <Route path="/recipe/:id" element={<ViewRecipe/>}/>
                        <Route path="/cookbook/:id" element={<ViewCookbook/>}/>
                        <Route path="/login" element={<Auth isSignup={false}/>}/>
                        <Route path="/signup" element={<Auth isSignup={true}/>}/>
                        <Route path="/error" element={<ErrorPage/>}/>
                    </Routes>
                ) : (
                    <Routes>
                        <Route path="/login" element={<Auth isSignup={false}/>}/>
                        <Route path="/signup" element={<Auth isSignup={true}/>}/>
                        <Route path="*" element={<Auth/>}/>
                        <Route path="/recipe/:id" element={<ViewRecipe/>}/>
                        <Route path="/cookbook/:id" element={<ViewCookbook/>}/>
                        <Route path="/error" element={<ErrorPage/>}/>
                    </Routes>
                )}
            </Router>
        </ChakraProvider>
    );
}

export default App;
