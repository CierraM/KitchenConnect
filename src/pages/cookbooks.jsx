import FilterSection from "../components/myRecipes/filterButton";
import List from "../components/myRecipes/List";
import Template from "../components/ui/template";
import RecipeBrowser from "../components/myRecipes/recipeBrowser";

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
            "_id": "63c1f67854e3fe5b572a5b67",
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

const Cookbooks = () => {
    const recipeTabContent = (
        <>
            <FilterSection></FilterSection>
            <List items={recipes.recipes} type={"recipe"}/>
        </>
    )

    const cookbookTabContent = (
        <List items={recipes.cookbooks} type={"cookbook"}/>
    )
    return (
        <Template>
            <RecipeBrowser recipeTabContent={recipeTabContent} cookbookTabContent={cookbookTabContent} defaultIndex={1}/>
        </Template>
    )
}

export default Cookbooks