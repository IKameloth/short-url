import express from "express"
import shortUrlRoutes from "./shortUrlRoutes"

const router = express.Router()

export default (): express.Router => {
  shortUrlRoutes(router)
  
  return router
}
