import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmPassword] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const toast = useToast();

  //   const handleClick = () => setShow(!show);
  const handleClick = () => setShow((prev) => !prev);

  // // implement cloudinary will do this later ------------------------------------

  const postDetails = (pics) => {
    // setLoading(true);
    // if (pics === undefined) {
    //   toast({
    //     title: "please select an image",
    //     status: "warning",
    //     duration: 4000,
    //     isClosable: true,
    //     position: "bottom",
    //   });
    //   return;
    // }
    // if (pics.type === "image/jpeg" || pics.type === "image/png") {
    //   const data = new FormData();
    //   data.append("file", pics);
    //   data.append(
    //     "upload_preset",
    //     process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
    //   );
    //   // data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);
    //   fetch(
    //     `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
    //     {
    //       method: "post",
    //       body: data,
    //     }
    //   )
    //     .then((res) => res.json())
    //     .then((data) => {
    //       // setPic(data.url.toString());
    //       //chat gpt recomm...
    //       setPic(data.secure_url);
    //       console.log(data.secure_url);
    //       setLoading(false);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       setLoading(false);
    //     });
    // } else {
    //   toast({
    //     title: "please select an image",
    //     status: "warning",
    //     duration: 4000,
    //     isClosable: true,
    //     position: "bottom",
    //   });
    //   setLoading(false);
    //   return;
    // }
  };

  const submitHandler = async () => {
    setLoading(true);

    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "please fill all the fields",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    if (password !== confirmpassword) {
      toast({
        title: "passwords do not match",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email,
          password,
          pic,
        },
        config
      );
      toast({
        title: "Registration is successfull",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));

      setLoading(false);

      navigate("/chats");
    } catch (error) {
      toast({
        title: "error occured",
        description: error.response.data.message,
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing="0px">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <InputRightElement width={"4.5rem"}>
            <Button h={"1.75rem"} size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <InputRightElement width={"4.5rem"}>
            <Button h={"1.75rem"} size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="pic" isRequired>
        <FormLabel>Uplaoad your picture</FormLabel>
        <Input
          type="file"
          p={1}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>

      <Button
        colorScheme="blue"
        width={"100%"}
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
