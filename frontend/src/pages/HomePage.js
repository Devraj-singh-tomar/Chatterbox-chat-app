import React from "react";
import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";

const HomePage = () => {
  return (
    <Container maxWidth="xl" centerContent>
      <Box
        display="flex"
        justifyContent={"center"}
        p={2}
        bg={"white"}
        w={"100%"}
        m={"20px 0 15px 0"}
        borderRadius={"10px"}
      >
        <Text as={"b"} fontSize={"1.7rem"} fontFamily={"work sans"}>
          ChatterBOX
        </Text>
      </Box>
      <Box bg={"white"} w={"100%"} p={2} borderRadius={"10px"}>
        <Tabs isFitted variant="enclosed">
          <TabList mb={"1em"}>
            <Tab as={"b"}>Login</Tab>
            <Tab as={"b"}>Sign Up</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>

            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;
