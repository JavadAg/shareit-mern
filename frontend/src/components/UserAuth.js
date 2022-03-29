import React, { useState } from "react"
import { GoogleLogin } from "react-google-login"
import { LoginAction } from "../redux/reducers/auth"
import { Signin, Signup } from "../redux/reducers/auth"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  HStack,
  Button,
  Heading,
  Text,
  useColorModeValue
} from "@chakra-ui/react"

const UserAuth = () => {
  const clientId = process.env.REACT_APP_CLIENT_ID
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [sign, setSign] = useState(false)

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const onFailure = (res) => {
    console.log("[Login failed]", res.profileObj)
  }

  const onSuccess = async (res) => {
    const data = { result: res?.profileObj, token: res?.tokenId }

    try {
      dispatch(LoginAction(data))
      navigate("/")
    } catch (err) {
      console.log(err)
    }
  }

  const signhandler = () => {
    setSign(!sign)
  }

  const submithandler = (e) => {
    e.preventDefault()
    if (!sign) {
      dispatch(Signin(data)).then((originalPromiseResult) => {
        localStorage.setItem(
          "profile",
          JSON.stringify(originalPromiseResult.payload)
        )
        navigate("/")
      })
    } else {
      dispatch(Signup(data)).then(() => {
        navigate("/")
      })
    }
  }

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={[26, 33]}>
            {sign ? "Sign up to your account" : "Sign in to your account"}
          </Heading>
          <Text fontSize={[16, 28]} color={"gray.600"}>
            to enjoy all of our cool features
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            {sign && (
              <HStack>
                <Box>
                  <FormControl
                    name="firstName"
                    onChange={(e) =>
                      setData({ ...data, firstName: e.target.value })
                    }
                    id="firstName"
                    label="First Name"
                    autoFocus
                    isRequired
                  >
                    <FormLabel>First Name</FormLabel>
                    <Input type="text" />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl
                    id="lastName"
                    isRequired
                    onChange={(e) =>
                      setData({ ...data, lastName: e.target.value })
                    }
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  >
                    <FormLabel>Last Name</FormLabel>
                    <Input type="text" />
                  </FormControl>
                </Box>
              </HStack>
            )}

            <FormControl
              id="email"
              onChange={(e) => setData({ ...data, email: e.target.value })}
              label="Email Address"
              name="email"
              isRequired
              autoComplete="email"
            >
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl
              name="password"
              isRequired
              label="Password"
              onChange={(e) => setData({ ...data, password: e.target.value })}
              id="password"
              autoComplete="new-password"
            >
              <FormLabel>Password</FormLabel>
              <Input type="password" />
            </FormControl>
            {sign && (
              <FormControl
                name="confirmPassword"
                label="confirmPassword"
                isRequired
                type="password"
                onChange={(e) =>
                  setData({ ...data, confirmPassword: e.target.value })
                }
                id="confirmPassword"
                autoComplete="new-password"
              >
                <FormLabel>confirmPassword</FormLabel>
                <Input type="password" />
              </FormControl>
            )}
            <Stack spacing={5}>
              <Button
                onClick={submithandler}
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500"
                }}
              >
                {sign ? "Sign up" : "Sign in"}
              </Button>
              <GoogleLogin
                clientId={clientId}
                render={(renderProps) => (
                  <Button
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    Google SignIn
                  </Button>
                )}
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={"single_host_origin"}
              />
              <Link onClick={signhandler} to="#">
                {sign
                  ? "Already have an account? Sign in"
                  : "Dont have an account ? Sign up"}
              </Link>
              <Button onClick={() => navigate("/")}>Go to Homepage</Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}
export default UserAuth
