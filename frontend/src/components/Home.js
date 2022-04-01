import React, { useState, useEffect } from "react"
import Posts from "./Posts"
import Navbar from "./Navbar"

const Home = () => {
  return (
    <div className="bg-gray-100">
      <Navbar />

      <Posts />
    </div>
  )
}

export default Home
