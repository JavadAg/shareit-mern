import express from "express"
import Post from "../models/post.js"
import upload from "../middleware/upload.js"
import fs from "fs"
import userauth from "../middleware/userauth.js"
import mongoose from "mongoose"

const router = express.Router()

router.post("/", userauth, upload.single("image"), async (req, res, next) => {
  if (req.body.text.length > 50) {
    return res.status(404).send(`No post with id: ${id}`)
  }

  try {
    const posts = await Post.create({
      title: req.body.title,
      text: req.body.text,
      image: { name: req.file.originalname, path: req.file.path },
      creator: req.userId,
      creatorname: req.name,
      timecreated: Date()
    })
    res.status(200).json({ posts })
  } catch (error) {
    console.log(error)
  }
})

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({})
    res.status(200).json({ posts })
  } catch (error) {
    console.log(error)
  }
})

router.patch("/:id", userauth, upload.single("image"), async (req, res) => {
  const id = req.params.id
  const title = req.body.title
  const text = req.body.text
  const updates = { title, text }

  if (req.file) {
    const post = await Post.findById(id)
    fs.unlinkSync(post.image.path)
    const image = { name: req.file.originalname, path: req.file.path }
    updates.image = image
  }
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`)
  try {
    const posts = await Post.findByIdAndUpdate(id, updates, {
      new: true
    })
    res.status(200).json({ posts })
  } catch (error) {
    console.log(error)
  }
})

router.patch("/:id/like", userauth, async (req, res) => {
  const id = req.params.id
  const userId = req.userId
  const post = await Post.findById(id)
  const index = post.like.findIndex((id) => id == String(req.userId))

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`)
  try {
    if (index == -1) {
      post.like.push(req.userId)
    } else {
      post.like = post.like.filter((id) => id !== String(req.userId))
    }
    const posts = await Post.findByIdAndUpdate(id, post, {
      new: true
    })
    res.status(200).json({ posts })
  } catch (error) {
    console.log(error)
  }
})

router.post("/:id/comment", userauth, async (req, res) => {
  const { id } = req.params
  const comment = req.body.usercomment.comment
  const post = await Post.findById(id)

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`)
  try {
    post.comment.push(comment)
    const posts = await Post.findByIdAndUpdate(id, post, {
      new: true
    })
    res.status(200).json({ posts })
  } catch (error) {
    console.log(error)
  }
})

router.delete("/:id/delete", userauth, async (req, res) => {
  const id = req.params.id
  try {
    const post = await Post.findById(id)
    fs.unlinkSync(post.image.path)
    const deletedpost = await Post.findByIdAndDelete(id)
    res.status(200).json({ deletedpost })
  } catch (error) {
    console.log(error)
  }
})

export default router
