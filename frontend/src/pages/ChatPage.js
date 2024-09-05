import React, { useState } from "react";
import { ChatState } from "../context/ChatProvider";
import { Box } from "@chakra-ui/react";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";

const ChatPage = () => {
  const { user } = ChatState();

  //this is used to refetch chatlist if there is any changes
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      {user && <SideDrawer />}

      <Box
        display={"flex"}
        justifyContent={"space-between"}
        width={"100%"}
        h={"88vh"}
        p={"10px"}
      >
        {user && <MyChats fetchAgain={fetchAgain} />}

        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default ChatPage;
