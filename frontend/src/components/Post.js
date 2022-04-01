import React, { Fragment, useEffect, useRef, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import CreatePost from "./CreatePost"
import { Follow } from "../redux/reducers/user"
import { Comment, Delete, Like } from "../redux/reducers/post"
import { FcLike, FcLikePlaceholder } from "react-icons/fc"
import { BsThreeDotsVertical } from "react-icons/bs"
import { CgChevronUpR, CgProfile } from "react-icons/cg"
import { Menu, Transition, Disclosure } from "@headlessui/react"

const Post = ({ post }) => {
  const user = JSON.parse(localStorage.getItem("profile"))
  const userId = user?.result?._id || user?.result?.googleId
  const [id, setId] = useState()
  const navigate = useNavigate()
  const dispatch = useDispatch()
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

  const followdispatch = (postdetail) => {
    const postername = postdetail.creatorname
    const posterId = postdetail.creator
    dispatch(Follow({ postername, posterId })).then(() => {
      navigate("/")
    })
  }

  const following = user?.result?.following

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
    <article className=" mb-4 break-inside break-inside-avoid p-6 rounded-xl bg-white flex flex-col bg-clip-border max-w-md">
      <div className="flex  items-center justify-between">
        <div className="flex">
          <a className="inline-block mr-4" href="#">
            <CgProfile className="rounded-full max-w-none w-12 h-12" />
          </a>
          <div className="flex flex-col">
            <div className="flex items-center">
              <a className="inline-block text-lg font-bold mr-2" href="#">
                {post?.creatorname}
              </a>
            </div>
            <div className="text-slate-500 text-sm">{post?.timecreated}</div>
          </div>
        </div>
      </div>
      <h2 className="text-2xl font-extrabold">{post?.title}</h2>
      <div className="py-4">
        <a className="flex" href="#">
          <img
            className="max-w-full rounded-lg"
            src={`http://localhost:3002/${post?.image?.path}`}
          />
        </a>
      </div>
      <p>{post.text}</p>
      <div className="py-4 flex justify-between items-center ">
        <button
          disabled={!userId}
          onClick={handleLike}
          className="inline-flex items-center"
          href="#"
        >
          {hasliked ? (
            <>
              <FcLike className="mr-2" />
            </>
          ) : (
            <>
              <FcLikePlaceholder className="mr-2" />
            </>
          )}
          <span className="text-lg  font-bold">{post?.like?.length}</span>
        </button>
        {userId === post.creator ? (
          <div className="z-10 text-right">
            <Menu as="div" className="relative">
              <div>
                <Menu.Button
                  onClick={() => setId(post._id)}
                  className=" justify-center  px-2 py-2 text-indigo-900 bg-slate-200 rounded-full hover:bg-slate-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                >
                  <BsThreeDotsVertical />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-1 py-1">
                    <Menu.Item>
                      {({ active }) => <CreatePost postId={post._id} />}
                    </Menu.Item>
                  </div>
                  <div className="px-1 py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={deletePost}
                          className={`${
                            active ? "bg-indigo-100 " : "text-gray-900"
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        >
                          Delete
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        ) : (
          <>
            {user ? (
              <div className=" z-10 text-right ">
                <Menu as="div" className="relative  ">
                  <div>
                    <Menu.Button
                      onClick={() => setId(post._id)}
                      className=" justify-center  px-2 py-2 text-indigo-900 bg-slate-200 rounded-full hover:bg-slate-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                    >
                      <BsThreeDotsVertical />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="px-1 py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => followdispatch(post)}
                              className={`${
                                active ? "bg-indigo-100  " : "text-gray-900"
                              } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                            >
                              {following.id?.includes(post?.creator)
                                ? "Unfollow"
                                : "Follow"}
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            ) : (
              ""
            )}
          </>
        )}
      </div>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-indigo-900 bg-indigo-100 rounded-lg hover:bg-indigo-200 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75">
              <span>Show comments</span>
              <CgChevronUpR
                className={`${
                  open ? "transform rotate-180" : ""
                } w-5 h-5 text-indigo-500`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
              <div className="relative">
                {user && (
                  <div className="flex justify-center items-center">
                    <input
                      className="pt-2 pb-2 pl-3 w-full h-11 bg-slate-100 rounded-lg placeholder:text-slate-600 font-medium pr-20"
                      type="text"
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Write a comment"
                    />

                    <span
                      onClick={handlecomment}
                      className="flex absolute cursor-pointer right-3 "
                    >
                      <svg
                        className="fill-indigo-500"
                        style={{ width: "22px", height: "22px" }}
                        viewBox="0 0 24 24"
                      >
                        <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z"></path>
                      </svg>
                    </span>
                  </div>
                )}

                <div className=" px-1 bg-slate-100 rounded-md mt-3 flex flex-col  ">
                  {post?.comment.map((comment, index) => (
                    <div className="font-mono p-1" key={index}>
                      {comment}
                    </div>
                  ))}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </article>
  )
}

export default Post
