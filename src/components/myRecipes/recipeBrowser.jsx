import Template from "../ui/template";
import {Spacer, Tab, TabList, TabPanel, TabPanels, Tabs, Text} from "@chakra-ui/react";
import SortButton from "./sortButton";
import FilterSection from "./filterButton";
import List from "./list";
import NewButton from "./newButton";
import FavoritesButton from "./favoritesButton";


const RecipeBrowser = ({recipeTabContent, cookbookTabContent, defaultIndex, children, showFavorites}) => {

    return (
        <>
            <Tabs colorScheme={"accent.500"} defaultIndex={defaultIndex} h={"full"}>
                <TabList>
                    <Tab>Recipes</Tab>
                    <Tab>Cookbooks</Tab>
                    <Spacer/>
                    {showFavorites && <FavoritesButton/>}
                </TabList>
                <TabPanels bg={"secondary.500"} h={"full"}>
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