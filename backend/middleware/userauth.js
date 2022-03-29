import jwt from "jsonwebtoken"
import "dotenv/config"

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    if (token) {
    }
    const customToken = token.length < 500

    let decodedData
    if (token && customToken) {
      decodedData = jwt.verify(token, process.env.SECRET)
      req.userId = decodedData?.id

      req.name = decodedData?.name
    } else {
      decodedData = jwt.decode(token)
      req.name = decodedData?.name
      req.userId = decodedData?.sub
    }

    next()
  } catch (error) {
    console.log(error)
  }
}

export default auth
