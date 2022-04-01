import express from "express"
import upload from "../middleware/upload.js"
import userauth from "../middleware/userauth.js"
import {
  get,
  getpostsbyid,
  create,
  update,
  like,
  comment,
  deletepost
} from "../controllers/post.js"

const router = express.Router()

router.post("/", userauth, upload.single("image"), create)

router.get("/", get)

router.post("/filter", getpostsbyid)

router.patch("/:id", userauth, upload.single("image"), update)

router.patch("/:id/like", userauth, like)

router.post("/:id/comment", userauth, comment)

router.delete("/:id/delete", userauth, deletepost)

export default router
