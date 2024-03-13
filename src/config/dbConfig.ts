import mongoose from "mongoose"

const connectDB = () => {
  mongoose.Promise = Promise
  mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@url-shortner-cluster.d9r1eoz.mongodb.net/?retryWrites=true&w=majority&appName=url-shortner-cluster`
  )
  
  mongoose.connection.on('connected', () => console.log(`connected with mongodb on: ${mongoose.connection.host} - ${mongoose.connection.name}`))
  mongoose.connection.on('error', (error) => console.log('error connection with mongodb =>', error))
}

export default connectDB