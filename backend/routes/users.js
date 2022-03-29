import express from "express"
import User from "../models/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import "dotenv/config"

const router = express.Router()

router.post("/signin", async (req, res) => {
  const { email, password } = req.body

  try {
    const existingUser = await User.findOne({ email })
    if (!existingUser)
      return res.status(404).json({ message: "user not found" })
    const isPasswordsValid = await bcrypt.compare(
      password,
      existingUser.password
    )
    if (!isPasswordsValid)
      return res.status(400).json({ message: "invalid password" })
    const token = jwt.sign(
      {
        email: existingUser.email,
        name: existingUser.name,
        id: existingUser._id
      },
      process.env.SECRET,
      { expiresIn: "1h" }
    )
    res.status(200).json({ result: existingUser, token })
  } catch (error) {
    res.status(500).json({ message: "something wrong " })
  }
})

router.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body

  try {
    const existingUser = await User.findOne({ email })
    if (existingUser)
      return res.status(400).json({ message: "user already exist" })
    if (password !== confirmPassword)
      return res.status(400).json({ message: "password dont match " })
    const hashedPassword = await bcrypt.hash(password, 10)
    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`
    })
    const token = jwt.sign(
      { email: result.email, name: result.name, id: result._id },
      process.env.SECRET,
      {
        expiresIn: "1h"
      }
    )
    res.status(200).json({ result, token })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: "something wrong " })
  }
})

export default router
