import Template from "../components/ui/template";
import RecipeBrowser from "../components/myRecipes/recipeBrowser";
import FilterSection from "../components/myRecipes/filterButton";
import List from "../components/myRecipes/list";
import CookbookTab from "../components/viewCookbook/cookbookTab";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import useHttp from "../util/use-http";
import NewButton from "../components/myRecipes/newButton";
import {useToast} from "@chakra-ui/react";

const ViewCookbook = () => {
    const {id} = useParams()
    const toast = useToast()
    const {isLoading, error, sendRequest} = useHttp()
    const [cookbook, setCookbook] = useState({})
    const [recipes, setRecipes] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        if (id == undefined) {
            navigate('/error')
        }
    })

    useEffect(() => {
        sendRequest({
            url: `${process.env.REACT_APP_SERVER_URL}/cookbook/${id}`,
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }, response => {
                setCookbook(response.cookbook)
        })
    }, [id, sendRequest])

    //Get recipes from server
    useEffect(() => {
        sendRequest({
            url: `${process.env.REACT_APP_SERVER_URL}/user/myRecipes`,
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }, response => {
            if (!error) {
                const cookbookRecipes = [].concat.apply([], response.cookbooks.map(c => c.recipes))
                const allRecipes = response.recipes.concat(cookbookRecipes)
                    .filter((v, i, a) => i === a.findIndex(t => (t._id === v._id)))
                setRecipes({recipes: allRecipes})
            }
        })
    }, [error, sendRequest, setRecipes])

    const recipeTabContent = (
        <>
            <FilterSection></FilterSection>
            <List items={recipes.recipes} type={"recipe"}/>
        </>
    )

    const cookbookTabContent = (
        <CookbookTab cookbook={cookbook} id={id}/>
    )

    useEffect(() => {
        if (error) {
            toast({
                title: "An error occurred.",
                description: "We're sorry, but an error occurred. Please try again.",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top-right"
            })
        }
    }, [error])

    return (
        <Template>
            <RecipeBrowser recipeTabContent={recipeTabContent} cookbookTabContent={cookbookTabContent} defaultIndex={1}>
                <NewButton/>
            </RecipeBrowser>
        </Template>
    )
}

export default ViewCookbook