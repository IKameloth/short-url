import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import http from "http"
import routes from "./routes"
import connectDB from "./config/dbConfig"

dotenv.config()
connectDB()

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

const server = http.createServer(app)

server.listen(process.env.PORT, () => {
  console.info(`Server is running on http://localhost/${process.env.PORT}/`)
})

app.use('/api/', routes())