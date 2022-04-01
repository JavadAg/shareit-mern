import React, { useState, useEffect } from "react"

import { Disclosure, Menu, Transition } from "@headlessui/react"
import Follow from "./Follow"

import CreatePost from "./CreatePost"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import { LogoutAction } from "../redux/reducers/user"
import { useLocation } from "react-router-dom"
import decode from "jwt-decode"

const Navbar = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const [user, setUser] = useState()
  const [showSidebar, setShowSidebar] = useState(false)

  const logout = () => {
    dispatch(LogoutAction())
    setUser(null)
    window.location.reload()
  }

  useEffect(() => {
    const token = user?.token
    if (token) {
      const decodedToken = decode(token)
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout()
      }
    }
    setUser(JSON.parse(localStorage.getItem("profile")))
  }, [location])

  return (
    <Disclosure
      as="nav"
      className="bg-slate-200 fixed justify-center items-center z-20 w-full"
    >
      <div className=" mx-auto px-2 sm:px-4 lg:px-5">
        <div className="relative flex items-center justify-around h-16">
          <div className="flex-1 flex items-center ">
            <div>
              <Link to={"/"}>
                <span className="text-lg italic flex justify-center items-center px-1 text-indigo-300 font-bold ">
                  ShareIt
                </span>
              </Link>
            </div>
            <div className="text-slate-800 ">
              {user ? (
                <button className="ml-1 sm:ml-2 py-1">
                  <CreatePost />
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="absolute flex flex-row justify-center items-center inset-y-0 right-0  pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {user ? (
              <>
                <span className="text-zinc-800 text-sm px-1 ">
                  {user.result.name}
                </span>
                <button
                  onClick={logout}
                  className="text-gray-700 justify-center items-center hover:bg-indigo-300 bg-slate-300   hover:text-slate-800 block px-2 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
                <div className="ml-1 relative ">
                  <Follow
                    onClick={() => setShowSidebar(true)}
                    showSidebar={showSidebar}
                    setShowSidebar={setShowSidebar}
                  />
                </div>
              </>
            ) : (
              <>
                <Link
                  className="text-slate-700 bg-slate-200  hover:bg-slate-300 rounded-md text-sm items-center px-2 py-1 "
                  to="/user"
                >
                  Login / Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </Disclosure>
  )
}

export default Navbar
