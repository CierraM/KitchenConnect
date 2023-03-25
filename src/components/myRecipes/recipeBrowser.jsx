
import {Spacer, Tab, TabList, TabPanel, TabPanels, Tabs, Text} from "@chakra-ui/react";
import FavoritesButton from "./favoritesButton";


const RecipeBrowser = ({recipeTabContent, cookbookTabContent, defaultIndex, children, showFavorites}) => {

    return (
        <>
            <Tabs colorScheme={"accent.500"} defaultIndex={defaultIndex} h={"full"} colorScheme="primary" >
                <TabList>
                    <Tab>Recipes</Tab>
                    <Tab>Cookbooks</Tab>
                    <Spacer/>
                    {showFavorites && <FavoritesButton/>}
                </TabList>
                <TabPanels h={"full"}>
                    <TabPanel h={"full"}>
                        {recipeTabContent}
                    </TabPanel>
                    <TabPanel h={"full"}>
                        {cookbookTabContent}
                    </TabPanel>
                </TabPanels>
            </Tabs>
            {children}
        </>
    )
}

export default RecipeBrowser