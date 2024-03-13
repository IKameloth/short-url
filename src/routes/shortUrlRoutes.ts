import express from "express"
import { createUrl, getAllUrl, getUrl, removeUrl, updateUrl } from "../controllers/shortUrlController"

export default (router: express.Router) => {
  router.get('/shortUrl', getAllUrl)
  router.get('/shortUrl/:id', getUrl)
  router.post('/shortUrl', createUrl)
  router.patch('/shortUrl/:id', updateUrl)
  router.delete('/shortUrl/:id', removeUrl)
}
