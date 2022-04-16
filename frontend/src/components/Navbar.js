import React, { Fragment, useState, useEffect } from "react"
import { Disclosure, Menu, Transition } from "@headlessui/react"
import Follow from "./Follow"
import CreatePost from "./CreatePost"
import { useDispatch } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import { LogoutAction } from "../redux/reducers/user"
import { useLocation } from "react-router-dom"
import decode from "jwt-decode"
import { HiOutlineMenuAlt1, HiOutlineX } from "react-icons/hi"

const Navbar = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const [user, setUser] = useState()

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
      {({ open }) => (
        <>
          <div className=" px-2 sm:px-6 lg:px-8">
            <div className=" flex items-center  justify-between h-16">
              <div className=" flex sm:hidden">
                <Disclosure.Button className=" p-2 rounded-md  hover:bg-indigo-300 duration-300 ease-in-out">
                  {open ? (
                    <HiOutlineX className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <HiOutlineMenuAlt1
                      className="block h-6 w-6"
                      aria-hidden="true"
                    />
                  )}
                </Disclosure.Button>
              </div>
              <div className=" flex items-center justify-center sm:items-stretch sm:justify-start">
                <Link to={"/"}>
                  <span className="text-lg italic flex justify-center items-center px-1 text-indigo-400 font-bold ">
                    ShareIt
                  </span>
                </Link>
              </div>
              <div className="hidden w-full sm:flex sm:w-auto">
                <ul className=" space-x-2 flex  items-center  text-center">
                  {user ? (
                    <>
                      <li>
                        <span className="text-zinc-800 text-sm  ">
                          Hello {user.result.name}
                        </span>
                      </li>
                      <li className="text-gray-700 ">
                        <CreatePost />
                      </li>
                      <li>
                        <button
                          onClick={logout}
                          className="text-gray-700  hover:bg-red-500 bg-red-300   hover:text-slate-800 px-2 py-2 rounded-md text-sm font-medium"
                        >
                          Logout
                        </button>
                      </li>
                      <li className="items-center justify-center flex">
                        <Follow />
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link
                          className="text-slate-700 bg-slate-200  hover:bg-slate-300 rounded-md text-sm items-center px-2 py-2 "
                          to="/user"
                        >
                          Login / Register
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel className="sm:hidden ">
              <div className="px-2 pt-2 pb-3 space-y-1 ">
                <ul className="space-y-3 flex flex-col ">
                  {user ? (
                    <>
                      <li className="flex text-zinc-800 text-sm px-2 bg-slate-100 w-full justify-center p-2 rounded-md items-center">
                        <span>Hello {user.result.name}</span>
                      </li>
                      <li type="button">
                        <Follow />
                      </li>
                      <li type="button" className="text-gray-700 ">
                        <CreatePost />
                      </li>
                      <li className=" ">
                        <button
                          className="text-gray-700 hover:bg-red-500 bg-red-300 hover:text-slate-800 px-2 py-2 rounded-md text-sm font-medium  w-full"
                          onClick={logout}
                        >
                          Logout
                        </button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="w-full text-slate-700 bg-slate-300  hover:bg-slate-300 rounded-md text-sm items-center px-2 py-2">
                        <Link type="button" className="w-full" to="/user">
                          Login / Register
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  )
}

export default Navbar
