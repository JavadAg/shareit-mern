import React, { useState, useEffect } from "react"
import Posts from "./Posts"
import Navbar from "./Navbar"
import {
  Box,
  Center,
  Heading,
  Flex,
  Text,
  Grid,
  Stack,
  Avatar,
  GridItem,
  Image,
  useColorModeValue
} from "@chakra-ui/react"
import StuffandThings from "./StuffandThings"

const Home = () => {
  return (
    <Grid templateColumns="repeat(5, 1fr)" gap={4}>
      <Navbar />
      <GridItem colSpan={4}>
        <Posts />
      </GridItem>
      <GridItem colSpan={1}>
        <StuffandThings />
      </GridItem>
    </Grid>
  )
}

export default Home
