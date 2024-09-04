import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BellIcon, ChevronDownIcon, Search2Icon } from "@chakra-ui/icons";
import { ChatState } from "../../context/ChatProvider";
import ProfileModal from "./ProfileModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ChatLoading from "../ChatLoading";
import UserListItem from "../UserAvatar/UserListItem";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();

  const navigate = useNavigate();
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { user, setSelectedChat, chats, setChats } = ChatState();

  const loginHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please enter something in search",
        status: "warning",
        duration: "4000",
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error occured",
        description: "Failed to load the Search results",
        status: "error",
        duration: "4000",
        isClosable: true,
        position: "bottom",
      });
    }
  };

  // const accessChat = async (userId) => {
  //   try {
  //     setLoadingChat(true);

  //     const config = {
  //       headers: {
  //         "Content-type": "application/json",
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //     };

  //     const { data } = await axios.post("/api/chat", { userId }, config);

  //     if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);

  //     setSelectedChat(data);
  //     setLoadingChat(false);
  //     onClose();
  //   } catch (error) {
  //     toast({
  //       title: "Error fetching chat",
  //       description: error.message,
  //       status: "error",
  //       duration: "4000",
  //       isClosable: true,
  //       position: "bottom",
  //     });
  //   }
  // };

  const accessChat = async (userId) => {
    // Check if a chat with this user already exists
    const existingChat = chats.find((chat) =>
      chat.users.some((u) => u._id === userId)
    );

    if (existingChat) {
      // If chat exists, set it as the selected chat
      setSelectedChat(existingChat);
    } else {
      try {
        setLoadingChat(true);

        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };

        // Make API request to create a new chat if it doesn't exist
        const { data } = await axios.post("/api/chat", { userId }, config);

        setChats([data, ...chats]); // Add the new chat to the existing chats
        setSelectedChat(data); // Set the new chat as the selected one
        setLoadingChat(false);
        onClose();
      } catch (error) {
        toast({
          title: "Error fetching chat",
          description: error.message,
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        bg={"#A1D6E2"}
        w={"100%"}
        p={"5px 10px 5px 10px"}
        borderWidth={"5px"}
        borderColor={"#A1D6E2"}
      >
        <Text
          sx={{
            fontWeight: "800",
            fontFamily: "work sans",
          }}
          fontSize={"2xl"}
        >
          ChatterBox
        </Text>

        <Tooltip label="Search Users" hasArrow placement="bottom">
          <Button variant="ghost" onClick={onOpen}>
            <Search2Icon fontSize={20} />
            <Text display={{ base: "none", md: "flex" }} px={"3"}>
              Search
            </Text>
          </Button>
        </Tooltip>

        <div>
          <Menu>
            <MenuButton p={3}>
              <BellIcon fontSize={20} m={1} />
            </MenuButton>
            {/* <MenuList></MenuList> */}
          </Menu>

          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                size={"sm"}
                cursor={"pointer"}
                name={user.name}
                src={user.pic}
              />
            </MenuButton>

            <MenuList>
              <MenuGroup title="Account">
                <ProfileModal user={user}>
                  <MenuItem justifyContent={"center"}>Profile</MenuItem>
                </ProfileModal>
                <MenuDivider />
                <MenuItem
                  justifyContent={"center"}
                  color={"red"}
                  onClick={loginHandler}
                >
                  Logout
                </MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
        </div>
      </Box>

      {/* Search Drawer */}
      <Drawer placement="right" isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />

        <DrawerContent>
          <DrawerHeader borderBottomWidth={"1px"}>Search Users</DrawerHeader>

          <DrawerBody>
            <Box display={"flex"} pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button
                bg={"rgb(25, 149, 173,0.8)"}
                _hover={{
                  background: "#1995AD",
                }}
                onClick={handleSearch}
              >
                <Search2Icon />
              </Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml={"auto"} display={"flex"} />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
