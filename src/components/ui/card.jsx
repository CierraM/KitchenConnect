const { Box } = require("@chakra-ui/react")


const card = ({ children }) => {
    return <Box
        shadow='lg'
    >{children}</Box>
}