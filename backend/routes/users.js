import express from "express"
import "dotenv/config"
import userauth from "../middleware/userauth.js"
import { signin, signup, follow } from "../controllers/user.js"

const router = express.Router()

router.post("/signin", signin)
router.put("/follow", userauth, follow)
router.post("/signup", signup)

export default router
