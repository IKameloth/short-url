import mongoose from "mongoose"
import { nanoid } from "nanoid"

// SCHEMA
const ShortUrlSchema = new mongoose.Schema({
  fullUrl: {
    type: String,
    required: true
  },
  shortUrl: {
    type: String,
    required: true,
    default: () => nanoid().substring(0,10)
  },
  clicks: {
    type: Number,
    default: 0
  },
  alias: {
    type: String,
    required: true,
    default: "Short Url Alias"
  }
}, {
  timestamps: true,
  versionKey: false
})

// MODEL
export const ShortUrlModel = mongoose.model('ShortUrl', ShortUrlSchema)

// ACTIONS
export const getUrls = () => ShortUrlModel.find()
export const getByFullUrl = (fullUrl: string) => ShortUrlModel.find({ fullUrl })
export const getUrlById = (idUrl: string) => ShortUrlModel.findOne({ _id: idUrl })
export const createShortUrl = (fullUrl: string) => ShortUrlModel.create({ fullUrl })
export const removeShortUrl = (idUrl: string) => ShortUrlModel.findOneAndDelete({ _id: idUrl })
export const updateShortUrl = (idUrl: string, values: Record<string, any>) => ShortUrlModel.findByIdAndUpdate(
  { _id: idUrl, values }, { new: true }
)