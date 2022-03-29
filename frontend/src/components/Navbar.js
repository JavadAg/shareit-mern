import React, { useState, useEffect } from "react"

import CreatePost from "./CreatePost"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import { LogoutAction } from "../redux/reducers/auth"
import { useLocation } from "react-router-dom"
import decode from "jwt-decode"
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  Text,
  MenuButton,
  useDisclosure,
  useColorModeValue
} from "@chakra-ui/react"

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [user, setUser] = useState()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const logout = () => {
    dispatch(LogoutAction())
    setUser(null)
    window.location.reload()
  }

  useEffect(() => {
    const token = user?.token
    if (token) {
      const decodedToken = decode(token)
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout()
      }
    }
    setUser(JSON.parse(localStorage.getItem("profile")))
  }, [location])

  return (
    <Box
      pos="fixed"
      width="full"
      zIndex={1}
      bg={useColorModeValue("gray.200")}
      px={[1, 2, 4]}
    >
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <HStack spacing={8} alignItems={"center"}>
          <Box>
            <Link to={"/"}>
              <Text fontWeight={"extrabold"} as={"em"}>
                ShareIt
              </Text>
            </Link>
          </Box>
          {user ? (
            <CreatePost />
          ) : (
            <Text fontSize={[14, 15, 18]}>
              Login or Register to Share your memory
            </Text>
          )}
        </HStack>
        <Flex alignItems={"center"}>
          {user ? (
            <>
              <Text px={[1, 4]} textColor={"red.800"} fontSize="1xl">
                {user.result.name}
              </Text>
              <Button
                onClick={logout}
                variant={"solid"}
                colorScheme={"red"}
                size={"sm"}
                mr={[1, 4]}
              >
                Logout
              </Button>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    alt={user?.result?.name}
                    src={user?.result?.imageUrl}
                  />
                </MenuButton>
              </Menu>
            </>
          ) : (
            <>
              <Button
                to="/user"
                as={Link}
                variant={"solid"}
                colorScheme={"telegram"}
                size={"sm"}
                mr={4}
              >
                Login / Register
              </Button>
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  )
}

export default Navbar
