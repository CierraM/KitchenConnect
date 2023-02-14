import Template from "../ui/template";
import {Spacer, Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";
import SortButton from "./sortButton";
import FilterSection from "./filterButton";
import List from "./List";
import NewButton from "./newButton";


const RecipeBrowser = ({recipeTabContent, cookbookTabContent, filter, defaultIndex}) => {

    return (
        <>
            <Tabs colorScheme={"orange"} defaultIndex={defaultIndex}>
                <TabList>
                    <Tab>Recipes</Tab>
                    <Tab>Cookbooks</Tab>
                    <Spacer/>
                    <SortButton/>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        {recipeTabContent}
                    </TabPanel>
                    <TabPanel>
                        {cookbookTabContent}
                    </TabPanel>
                </TabPanels>
            </Tabs>
            <NewButton/>
        </>
    )
}

export default RecipeBrowser