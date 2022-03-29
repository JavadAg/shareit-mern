import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import CreatePost from "./CreatePost"
import { Comment, Delete, Like } from "../redux/reducers/post"
import { FcLike, FcLikePlaceholder } from "react-icons/fc"
import {
  Box,
  Center,
  Heading,
  Text,
  Button,
  Stack,
  IconButton,
  Menu,
  Icon,
  MenuButton,
  MenuItem,
  MenuList,
  Image,
  AccordionPanel,
  AccordionButton,
  Accordion,
  AccordionIcon,
  AccordionItem,
  Input
} from "@chakra-ui/react"
import { MdDeleteOutline, MdOutlineUpdate } from "react-icons/md"
import { BsThreeDotsVertical } from "react-icons/bs"

const Post = ({ post }) => {
  const user = JSON.parse(localStorage.getItem("profile"))
  const userId = user?.result?._id || user?.result?.googleId
  const [id, setId] = useState("")
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const [liked, setLiked] = useState()
  const [comment, setComment] = useState([])
  const hasliked = post.like.find((like) => like === userId)

  const handleLike = async () => {
    dispatch(Like(post._id))
  }
  const usercomment = `${user?.result?.name} : ${comment}`
  const handlecomment = () => {
    dispatch(
      Comment({
        postId: post?._id,
        comment: usercomment
      })
    )
    setComment([])
  }

  const deletePost = () => {
    dispatch(Delete(post._id))
  }

  useEffect(() => {
    if (hasliked) {
      setLiked(true)
    } else {
      setLiked(false)
    }
  })

  return (
    <Center w={[300, 380, 600, 650]} py={4}>
      <Box
        w={"full"}
        bg={"white"}
        boxShadow={"2xl"}
        rounded={"md"}
        p={4}
        overflow={"hidden"}
      >
        <Box mb={6} pos={"relative"} justify="center" align={"center"}>
          <Image
            objectFit="cover"
            height="100%"
            width="100%"
            src={`http://localhost:3002/${post?.image?.path}`}
          />
        </Box>
        <Stack direction="row" justify="space-between" align="center">
          <Button
            size="sm"
            color="primary"
            disabled={!user?.result}
            onClick={handleLike}
          >
            {hasliked ? (
              <>
                <FcLike />
                &nbsp;
                {post?.like?.length}
              </>
            ) : (
              <>
                <FcLikePlaceholder />
                &nbsp;
                {post?.like?.length}
              </>
            )}
          </Button>
          {userId === post.creator && (
            <Menu matchWidth placement="bottom-end">
              {({ isOpen }) => (
                <>
                  <MenuButton
                    isActive={isOpen}
                    as={IconButton}
                    size="sm"
                    icon={<BsThreeDotsVertical />}
                    isRound
                  ></MenuButton>
                  <MenuList minW={"0"}>
                    <MenuItem onClick={deletePost}>Delete</MenuItem>
                    <MenuItem onClick={() => setId(post._id)}>
                      <CreatePost postId={id} />
                    </MenuItem>
                  </MenuList>
                </>
              )}
            </Menu>
          )}
        </Stack>
        <Stack>
          <Stack
            mt={6}
            justify="space-between"
            direction={"row"}
            spacing={4}
            align={"center"}
          >
            <Stack direction={"column"} spacing={0} fontSize={"sm"}>
              <Text fontSize="md" fontWeight={600}>
                Photo by : {post.creatorname}
              </Text>
              <Text color={"gray.500"}>Created at :{post?.timecreated}</Text>
            </Stack>
          </Stack>

          <Heading
            noOfLines={1}
            color={"gray.700"}
            fontSize={{ xs: "1xl", sm: "2xl", md: "3xl" }}
            fontFamily={"body"}
          >
            {post?.title}
          </Heading>

          <Text fontSize="sm" color={"gray.600"}>
            {post?.text}
          </Text>
          <Accordion allowMultiple>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="center">
                    Comments
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Stack justify="center" align="center" direction="row">
                  <Input
                    placeholder="nice pic ..."
                    size="sm"
                    maxLength={45}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <Button onClick={handlecomment} size="sm">
                    Send
                  </Button>
                </Stack>
                {post?.comment.map((comment, index) => (
                  <Text fontSize="sm" key={index}>
                    {comment}
                  </Text>
                ))}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Stack>
      </Box>
    </Center>
  )
}

export default Post
