import Post from "../models/post.js"
import mongoose from "mongoose"
import fs from "fs"

export const create = async (req, res, next) => {
  try {
    const post = await Post.create({
      title: req.body.title,
      text: req.body.text,
      image: { name: req.file.originalname, path: req.file.path },
      creator: req.userId,
      creatorname: req.name,
      timecreated: Date()
    })
    res.status(200).json({ post })
  } catch (error) {
    console.log(error)
  }
}

export const get = async (req, res) => {
  try {
    const posts = await Post.find({})
    res.status(200).json({ posts })
  } catch (error) {
    console.log(error)
  }
}

export const getpostsbyid = async (req, res) => {
  const ids = req.body
  try {
    const posts = await Post.find({ creator: ids })
    res.status(200).json({ posts })
  } catch (error) {
    console.log(error)
  }
}

export const update = async (req, res) => {
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
    const post = await Post.findByIdAndUpdate(id, updates, {
      new: true
    })
    res.status(200).json({ post })
  } catch (error) {
    console.log(error)
  }
}

export const like = async (req, res) => {
  const id = req.params.id
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`)
  const post = await Post.findById(id)
  const index = post.like.findIndex((id) => id == String(req.userId))

  try {
    if (index == -1) {
      post.like.push(req.userId)
    } else {
      post.like = post.like.filter((id) => id !== String(req.userId))
    }
    const Likedpost = await Post.findByIdAndUpdate(id, post, {
      new: true
    })

    res.status(200).json({ Likedpost })
  } catch (error) {
    console.log(error)
  }
}

export const comment = async (req, res) => {
  const { id } = req.params
  const comment = req.body.usercomment.comment
  const post = await Post.findById(id)

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`)
  try {
    post.comment.push(comment)
    const CommentedPost = await Post.findByIdAndUpdate(id, post, {
      new: true
    })
    res.status(200).json({ CommentedPost })
  } catch (error) {
    console.log(error)
  }
}

export const deletepost = async (req, res) => {
  const id = req.params.id
  try {
    const post = await Post.findById(id)
    fs.unlinkSync(post.image.path)
    const deletedpost = await Post.findByIdAndDelete(id)
    res.status(200).json({ deletedpost })
  } catch (error) {
    console.log(error)
  }
}
