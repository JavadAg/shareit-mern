import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Get } from "../redux/reducers/post"
import { useLocation, useParams } from "react-router-dom"
import { Flex } from "@chakra-ui/react"
import Post from "./Post"

export default function RecipeReviewCard() {
  const { posts } = useSelector((state) => state.post)
  const dispatch = useDispatch()
  const location = useLocation()
  const postsinfo = posts
  const { id } = useParams()

  useEffect(() => {
    dispatch(Get())
  }, [location, id])

  return (
    <Flex
      marginTop="60px"
      justify="center"
      align="center"
      direction="column-reverse"
    >
      {postsinfo?.map((post, index) => (
        <Post key={index} post={post} />
      ))}
    </Flex>
  )
}
