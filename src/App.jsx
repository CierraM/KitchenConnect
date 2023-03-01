import { ChakraProvider } from '@chakra-ui/react'
import MyRecipes from './pages/myRecipes';
import { BrowserRouter as Router,
  Routes,
  Route,
  Navigate
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

function App() {

  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MyRecipes/> } />
          <Route path="/myRecipes" element={<MyRecipes/> } />
          <Route path="/login" element={<Auth isSignup={false}/>} />
          <Route path="/signup" element={<Auth isSignup={true}/>} />
          <Route path="/recipe/:id" element={<ViewRecipe />}/>
          {/*<Route path="/myCookbooks" element={<Cookbooks />}/>*/}
          <Route path="/cookbook/:id" element={<ViewCookbook />}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/createRecipe" element={<CreateRecipe editing={false}/>}/>
          <Route path={"/recipe/:id/edit"} element={<CreateRecipe editing={true}/> }/>
          <Route path="/createCookbook" element={<CreateCookbook editing={false}/>}/>
          <Route path="/cookbook/:id/edit" element={<CreateCookbook editing={true}/>}/>
          <Route path="/group/:id" element={<ViewGroup/>}/>
          <Route path="/group/create" element={<CreateGroup/>}/>
          <Route path="/error" />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
