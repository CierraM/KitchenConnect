import Template from "../components/ui/template";
import RecipeBrowser from "../components/myRecipes/recipeBrowser";
import FilterSection from "../components/myRecipes/filterButton";
import List from "../components/myRecipes/list";
import CookbookTab from "../components/viewCookbook/cookbookTab";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import useHttp from "../util/use-http";
import NewButton from "../components/myRecipes/newButton";

const recipes = {
    "recipes": [
        {
            "_id": "63c1c4f03ead35dcb96a425c",
            "title": "Old recipe",
            "description": "this is a recipe",
            "tags": [],
            "ingredients": [
                "5 apples",
                "3 bananas",
                "1 cup of marshmallow sauce"
            ],
            "steps": [
                {
                    "ordinal": 1,
                    "text": "mix all ingredients together",
                    "_id": "63c1c4f03ead35dcb96a425d"
                }
            ],
            "related": [],
            "private": false
        },
        {
            "_id": "63d463cbaf850a456504a801",
            "title": "Crepes",
            "description": "my favorite crepes",
            "image": "",
            "tags": [
                "breakfast",
                "eggs"
            ],
            "ingredients": [
                "2 cups of flour",
                "3 eggs",
                "1/2 tsp salt"
            ],
            "steps": [
                {
                    "ordinal": 1,
                    "text": "whisk all ingredients together",
                    "_id": "63d463cbaf850a456504a802"
                }
            ],
            "related": [],
            "private": false
        },
        {
            "_id": "63d464431d51d734a48f39a1",
            "title": "chocolate crepes",
            "description": "my other favorite crepes",
            "image": "",
            "tags": [
                "breakfast",
                "eggs",
                "dessert"
            ],
            "ingredients": [
                "2 cups of flour",
                "3 eggs",
                "1/2 tsp salt",
                "1 cup melted chocolate chips"
            ],
            "steps": [
                {
                    "ordinal": 1,
                    "text": "whisk all ingredients together",
                    "_id": "63d464431d51d734a48f39a2"
                }
            ],
            "related": [],
            "private": false
        }
    ],
    "cookbooks": [
        {
            "_id": "0",
            "title": "My Second Cookbook",
            "recipes": [
                {
                    "_id": "63c1c4f03ead35dcb96a425c",
                    "title": "Old recipe",
                    "description": "this is a recipe",
                    "tags": [],
                    "ingredients": [
                        "5 apples",
                        "3 bananas",
                        "1 cup of marshmallow sauce"
                    ],
                    "steps": [
                        {
                            "ordinal": 1,
                            "text": "mix all ingredients together"
                        }
                    ],
                    "related": [],
                    "private": false,
                    "accessLevel": "readonly",
                    "isFavorite": false
                },
                {
                    "_id": "63d464431d51d734a48f39a1",
                    "title": "chocolate crepes",
                    "description": "my other favorite crepes",
                    "tags": [
                        "breakfast",
                        "eggs",
                        "dessert"
                    ],
                    "ingredients": [
                        "2 cups of flour",
                        "3 eggs",
                        "1/2 tsp salt",
                        "1 cup melted chocolate chips"
                    ],
                    "steps": [
                        {
                            "ordinal": 1,
                            "text": "whisk all ingredients together"
                        }
                    ],
                    "related": [],
                    "private": false,
                    "accessLevel": "readonly",
                    "isFavorite": false
                }
            ]
        }
    ]
}
const ViewCookbook = () => {
    const {id} = useParams()
    const {isLoading, error, sendRequest} = useHttp()
    const [cookbook, setCookbook] = useState({})

    useEffect(() => {
        sendRequest({
            url: `${process.env.REACT_APP_SERVER_URL}/cookbook/${id}`,
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }, response => {
                setCookbook(response.cookbook)
        })
    }, [id, sendRequest])

    const recipeTabContent = (
        <>
            <FilterSection></FilterSection>
            <List items={recipes.recipes} type={"recipe"}/>
        </>
    )

    const cookbookTabContent = (
        <CookbookTab cookbook={cookbook} id={id}/>
    )

    return (
        <Template>
            <RecipeBrowser recipeTabContent={recipeTabContent} cookbookTabContent={cookbookTabContent} defaultIndex={1}>
                <NewButton/>
            </RecipeBrowser>
        </Template>
    )
}

export default ViewCookbook