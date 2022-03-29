import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Create, Update } from "../redux/reducers/post"
import {
  Modal,
  Button,
  FormControl,
  Input,
  FormLabel,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  useDisclosure
} from "@chakra-ui/react"
import { Link, useNavigate } from "react-router-dom"

const CreatePost = ({ postId }) => {
  const dispatch = useDispatch()
  const [title, setTitle] = React.useState("")
  const [text, setText] = React.useState("")
  const [image, setImage] = React.useState()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate()
  const initialRef = React.useRef()
  const finalRef = React.useRef()

  let form = new FormData()
  form.append("title", title)
  form.append("text", text)
  form.append("image", image)

  const postDetail = useSelector((state) =>
    postId
      ? state?.post?.posts?.find((message) => message._id === postId)
      : null
  )

  useEffect(() => {
    if (postDetail) {
      setTitle(postDetail.title)
      setText(postDetail.text)
    }
  }, [postDetail])

  const formhandler = (e) => {
    e.preventDefault()
    if (postDetail) {
      dispatch(Update({ postId: postId, form: form }))
      onClose()
    } else {
      dispatch(Create(form)).then(() => {
        onClose()
      })
      setTitle("")
      setText("")
    }
  }

  return (
    <>
      <Link to="#" onClick={onOpen}>
        Post
      </Link>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent w={{ sm: "300px", md: "500px", lg: "1000px" }}>
          <ModalHeader>Share with Your friends</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired>
              <FormLabel>Title</FormLabel>
              <Input
                ref={initialRef}
                value={title}
                label="Title"
                maxLength={30}
                placeholder="a beautiful day in ..."
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>

            <FormControl isRequired mt={4}>
              <FormLabel>Text</FormLabel>

              <Input
                value={text}
                name="text"
                label="Text"
                maxLength={70}
                placeholder="your@email.com"
                onChange={(e) => setText(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired mt={4}>
              <Input
                mt={4}
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            {text.length > 70 || title.length > 30 ? (
              "Error : Check form values !"
            ) : (
              <Button onClick={formhandler} colorScheme="blue" mr={3}>
                Save
              </Button>
            )}

            <Button ml="1" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreatePost
