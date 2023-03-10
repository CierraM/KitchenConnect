import Template from "../ui/template";
import {Spacer, Tab, TabList, TabPanel, TabPanels, Tabs, Text} from "@chakra-ui/react";
import SortButton from "./sortButton";
import FilterSection from "./filterButton";
import List from "./list";
import NewButton from "./newButton";


const RecipeBrowser = ({recipeTabContent, cookbookTabContent, defaultIndex, children}) => {

    return (
        <>
            <Tabs colorScheme={"orange"} defaultIndex={defaultIndex}>
                <TabList>
                    <Tab>Recipes</Tab>
                    <Tab>Cookbooks</Tab>
                    <Spacer/>
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
            {children}
        </>
    )
}

export default RecipeBrowser