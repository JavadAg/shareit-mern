import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import "dotenv/config"
import usersRoutes from "./routes/users.js"
import postRoutes from "./routes/post.js"
import path from "path"

const app = express()
const __dirname = path.resolve()
app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.urlencoded({ extended: true }))

app.use(cors())

app.use("/users", usersRoutes)
app.use("/post", postRoutes)
app.use("/images", express.static(path.join(__dirname, "images")))

app.get("/", (req, res) => {
  res.send("app is runing")
})

mongoose
  .connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err))

app.listen(process.env.PORT, () =>
  console.log(`listening on port${process.env.PORT}`)
)
