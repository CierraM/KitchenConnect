import {
    Alert,
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button
} from "@chakra-ui/react";
import {useRef} from "react";
import useHttp from "../../util/use-http";
import {useNavigate} from "react-router-dom";


const DeleteDialog = ({isOpen, onClose, deleteUrl, title} ) => {
    const cancelRef = useRef()
    const {isLoading, error, sendRequest} = useHttp();
    const navigate = useNavigate();

    const deleteRecipe = () => {
        sendRequest({
            url: deleteUrl,
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        }, response => {
            if (!error) {
                navigate('/')
            }
        })
    }
    return (
        <>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            {title}
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            {error && <Alert status="error">Unable to delete</Alert>}
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose} disabled={isLoading}>
                                Cancel
                            </Button>
                            <Button colorScheme='red' onClick={deleteRecipe} ml={3} disabled={isLoading}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}

export default DeleteDialog