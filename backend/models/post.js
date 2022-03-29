import mongoose from "mongoose"

const postSchema = mongoose.Schema(
  {
    title: { type: "String", required: true },
    text: { type: "String", required: true },
    image: { path: String, name: String },
    creator: { type: "String", required: true },
    creatorname: { type: "String", required: true },
    like: { type: [String], default: [] },
    timecreated: { type: String },
    comment: { type: [String], default: [] }
  },
  { timestamps: true }
)

const Post = mongoose.model("Post", postSchema)
export default Post
