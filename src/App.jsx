import { ChakraProvider, Box } from '@chakra-ui/react'
import Menu from './components/menu/Menu';

function App() {
  return (
    <ChakraProvider>
      <Box className="App">
        <Menu />
      </Box>
    </ChakraProvider>
  );
}

export default App;
