import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Create, Update } from "../redux/reducers/post"

const CreatePost = ({ postId }) => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState("")
  const [text, setText] = useState("")
  const [image, setImage] = useState()
  const [showModal, setShowModal] = React.useState(false)

  const postDetail = useSelector((state) =>
    postId
      ? state?.post?.posts?.find((message) => message._id === postId)
      : null
  )

  let form = new FormData()
  form.append("title", title)
  form.append("text", text)
  form.append("image", image)

  useEffect(() => {
    if (postDetail) {
      setTitle(postDetail.title)
      setText(postDetail.text)
    }
  }, [postId])

  const submithandler = (e) => {
    e.preventDefault()
    if (postDetail) {
      dispatch(Update({ postId: postId, form: form })).then(() => {
        setShowModal(false)
      })
    } else {
      dispatch(Create(form)).then(() => {
        setShowModal(false)
      })
      setTitle("")
      setText("")
    }
  }

  return (
    <>
      <a
        type="button"
        className={`hover:bg-indigo-200 bg-slate-300 text-gray-900
         flex rounded-md justify-center px-2 py-2 text-sm cursor-pointer ${
           postId ? "bg-white" : ""
         }`}
        onClick={() => setShowModal(true)}
      >
        {postId ? "Edit" : "Create Post"}
      </a>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-sm">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl text-slate-700 font-semibold">
                    Create your Post
                  </h3>
                </div>

                <div className="relative p-6 flex-auto">
                  <form className=" space-y-6" onSubmit={submithandler}>
                    <div className="rounded-md shadow-sm -space-y-px">
                      <div>
                        <label
                          htmlFor="name"
                          className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                        >
                          Title
                        </label>
                        <input
                          value={title}
                          name={"title"}
                          required
                          label="Title"
                          onChange={(e) => setTitle(e.target.value)}
                          id="name"
                          maxLength={30}
                          className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                          placeholder="a beautiful day in ..."
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="name"
                          className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                        >
                          Text
                        </label>
                        <input
                          name="text"
                          value={text}
                          label="Text"
                          required
                          maxLength={70}
                          onChange={(e) => setText(e.target.value)}
                          className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="name"
                          className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                        >
                          Photo (max size 2mb)
                        </label>
                        {postDetail ? (
                          <input
                            className="block w-full cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-transparent text-sm rounded-sm"
                            accept="image/*"
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                          />
                        ) : (
                          <input
                            className="block w-full cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-transparent text-sm rounded-sm"
                            accept="image/*"
                            required
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                          />
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-5  items-center justify-center p-6  ">
                      <button
                        className="flex items-center py-1 px-3 bg-indigo-200 rounded-md shadow-xs cursor-pointer text-gray-900 hover:bg-indigo-300 hover:text-gray-900"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                      {text.length > 70 ||
                      title.length > 30 ||
                      image?.size > 2000000 ? (
                        <p className="bg-red-200 p-1 rounded-md">
                          Error : Check form values !
                        </p>
                      ) : (
                        <button
                          className="flex items-center py-1 px-3 bg-indigo-200 rounded-md shadow-xs cursor-pointer text-gray-900 hover:bg-indigo-300 hover:text-gray-900"
                          type="submit"
                        >
                          Save
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  )
}

export default CreatePost
