import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Get, GetPostbyId } from "../redux/reducers/post"
import { Link, useLocation, useParams } from "react-router-dom"

import Post from "./Post"

const Posts = () => {
  const { posts } = useSelector((state) => state.post)
  const dispatch = useDispatch()
  const location = useLocation()
  const postsinfo = posts
  const { id } = useParams()
  const currentuser = JSON.parse(localStorage.getItem("profile"))

  const followingIDs = currentuser?.result?.following?.id

  useEffect(() => {
    dispatch(Get())
  }, [location, id])

  const handlePosts = () => {
    dispatch(GetPostbyId(followingIDs))
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-row space-x-4 mt-20">
        {followingIDs?.length > 0 && (
          <div className=" bg-slate-200 hover:bg-slate-300  px-2 py-1 rounded-md">
            <button onClick={handlePosts}>Following</button>
          </div>
        )}
        <div className=" bg-slate-200 px-2 py-1 rounded-md hover:bg-slate-300 ">
          <Link to="/">All Posts</Link>
        </div>
      </div>
      <div className="flex flex-col-reverse justify-center items-center mt-5">
        {postsinfo?.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>
    </div>
  )
}

export default Posts
