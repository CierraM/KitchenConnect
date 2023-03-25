import { useLocation, useNavigate} from "react-router-dom";
import {ArrowBackIcon} from "@chakra-ui/icons";
import {Button} from "@chakra-ui/react";
import {useEffect, useRef} from "react";


const BackButton = () => {
    const navigate = useNavigate();
    const location = useLocation()

    const previousLocationRef = useRef();

    useEffect(() => {
        previousLocationRef.current = location;
    }, [location])

    const handleClick = () => {
        if (previousLocationRef.current) {
            const prevState = previousLocationRef.current.state;

            if (prevState?.createPage) {
                navigate('/myRecipes')
            } else {
                navigate(-1)
            }
        }
    }

    return (
        <Button aria-label={'back'}  onClick={handleClick} variant={'link'}><ArrowBackIcon/> Back </Button>
    )
}

export default BackButton