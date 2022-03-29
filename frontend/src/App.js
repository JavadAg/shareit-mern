import React from "react"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom"
import Home from "./components/Home"
import UserAuth from "./components/UserAuth"
import { ChakraProvider } from "@chakra-ui/react"

function App() {
  const user = JSON.parse(localStorage.getItem("profile"))

  return (
    <ChakraProvider resetCSS={true}>
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route
            path="/user"
            exact
            element={user ? <Navigate to={"/"} /> : <UserAuth />}
          />
        </Routes>
      </Router>
    </ChakraProvider>
  )
}

export default App
