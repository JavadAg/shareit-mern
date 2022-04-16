import React from "react"
import { CgProfile } from "react-icons/cg"

const Following = () => {
  const [showModal, setShowModal] = React.useState(false)
  const followings = JSON.parse(localStorage.getItem("profile"))

  const followingDetail = followings?.result?.following
  const fname = followingDetail.fname

  return (
    <>
      <a
        className="items-center cursor-pointer z-50 flex rounded-md justify-center px-2 py-1 text-sm bg-slate-300"
        onClick={() => setShowModal(true)}
      >
        <CgProfile className="text-3xl text-slate-600 justify-center  cursor-pointer " />
      </a>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-sm">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl text-slate-700 font-semibold">
                    Following
                  </h3>
                </div>

                <div className="relative p-6 flex flex-col space-y-1">
                  {fname.length <= 0
                    ? "You are not following anyone"
                    : fname.map((name, index) => (
                        <span
                          className="bg-slate-100  p-2 rounded-md"
                          key={index}
                        >
                          {name}
                        </span>
                      ))}
                </div>
                <div className="flex space-x-5  items-center justify-center p-6  ">
                  <button
                    className="flex items-center py-1 px-3 bg-indigo-200 rounded-md shadow-xs cursor-pointer text-gray-900 hover:bg-indigo-300 hover:text-gray-900"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
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

export default Following
