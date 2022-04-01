import React, { useState, useEffect } from "react"

import { Signin, Signup } from "../redux/reducers/user"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, Link } from "react-router-dom"

const UserAuth = () => {
  const { error } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [sign, setSign] = useState(false)
  const [errormessage, setErrormessage] = useState(false)

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const signhandler = () => {
    setSign(!sign)
  }

  const submithandler = (e) => {
    e.preventDefault()
    if (!sign) {
      dispatch(Signin(data)).then((originalPromiseResult) => {
        navigate("/")
      })
    } else {
      dispatch(Signup(data)).then(() => {
        navigate("/")
      })
    }
  }

  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {sign ? "Sign up to your account" : "Sign in to your account"}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              <span className="font-medium text-indigo-400 hover:text-indigo-500">
                to enjoy all of our cool features{" "}
              </span>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={submithandler}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                {sign && (
                  <div>
                    <div>
                      <label htmlFor="firstName" className="sr-only">
                        First Name
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        maxLength="20"
                        type="text"
                        required
                        onChange={(e) =>
                          setData({ ...data, firstName: e.target.value })
                        }
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="First Name"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="sr-only">
                        First Name
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        maxLength="20"
                        type="text"
                        required
                        onChange={(e) =>
                          setData({ ...data, lastName: e.target.value })
                        }
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Last Name"
                      />
                    </div>
                  </div>
                )}
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  maxLength="35"
                  type="email"
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
              {sign && (
                <div>
                  <label htmlFor="confirmPassword" className="sr-only">
                    Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    onChange={(e) =>
                      setData({ ...data, confirmPassword: e.target.value })
                    }
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Confirm Password"
                  />
                </div>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="group mb-3 relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-400 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {sign ? "Sign up" : "Sign in"}
              </button>
              {errormessage && (
                <span className="text-red-500 text-xl font-bold flex justify-center items-end">
                  Error try again
                </span>
              )}
            </div>
          </form>
          <Link onClick={signhandler} to="#">
            {sign
              ? "Already have an account? Sign in"
              : "Dont have an account ? Sign up"}
          </Link>
          <div>
            <button
              className=" flex justify-center text-sm hover:text-stone-700 items-center"
              onClick={() => navigate("/")}
            >
              Go to Homepage
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
export default UserAuth
