import React from "react"
import { CgProfile } from "react-icons/cg"

import { Follow } from "../redux/reducers/user"
import { useDispatch } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"

const Following = ({ showSidebar, setShowSidebar }) => {
  const dispatch = useDispatch()

  const btnRef = React.useRef()
  const navigate = useNavigate()
  const followings = JSON.parse(localStorage.getItem("profile"))

  const followingDetail = followings?.result?.following
  const fname = followingDetail.fname

  return (
    <>
      {showSidebar ? (
        <button
          className="flex text-4xl text-white items-center cursor-pointer fixed right-6 top-2 z-50"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          x
        </button>
      ) : (
        <CgProfile
          className="text-3xl text-slate-600 justify-center  cursor-pointer"
          onClick={() => setShowSidebar(!showSidebar)}
        />
      )}

      <div
        className={`top-0 right-0 rounded-lg w-64 bg-gray-800   text-white fixed h-full z-40  ease-in-out duration-300 ${
          showSidebar ? "translate-x-0 " : "translate-x-full"
        }`}
      >
        <span className="text-lg flex flex-col justify-center items-center align-middle mt-16 space-y-3  font-semibold text-white">
          Users you following
        </span>
        <h3 className="text-lg flex flex-col justify-center items-center align-middle mt-8 space-y-3   text-white">
          {fname.map((name, index) => (
            <span key={index}>{name}</span>
          ))}
        </h3>
      </div>
    </>
  )
}

export default Following
