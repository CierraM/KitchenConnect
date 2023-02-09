import { ChakraProvider } from '@chakra-ui/react'
import MyRecipes from './pages/myRecipes';
import { BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Auth from './pages/auth';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MyRecipes/> } />
          <Route path="/login" element={<Auth isSignup={false}/>} />
          <Route path="/signup" element={<Auth isSignup={true}/>} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
