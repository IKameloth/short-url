import express from "express"
import { createShortUrl, getByFullUrl, getUrlById, getUrls, removeShortUrl } from "../models/shortUrlModel"

export const getAllUrl = async(req: express.Request, res: express.Response) => {
  try {
    const allUrl = await getUrls()
    if (allUrl.length <= 0) return res.status(404).send({ message: "Short urls not found!" })

    return res.status(200).send(allUrl)
  } catch (error) {
    console.log('short url controller error: ', error)
    return res.status(500).send({ message: "Something went wrong!" })
  }
}

export const getUrl = async(req: express.Request, res: express.Response) => {
  const idUrl = req.params.id

  try {
    const shortUrl = await getUrlById(idUrl)
    if (!shortUrl) return res.status(404).send({ message: "Short url not found" })

    shortUrl.clicks++
    await shortUrl.save()

    res.status(200).redirect(`${shortUrl.fullUrl}`)
  } catch (error) {
    console.log('short url controller error: ', error)
    return res.status(500).send({ message: "Something went wrong!" })
  }
}

export const createUrl = async(req: express.Request, res: express.Response) => {
  const { fullUrl } = req.body
  
  try {
    const urlFounded = await getByFullUrl(fullUrl)
    if (urlFounded.length > 0) return res.status(409).send(urlFounded)

    const shortUrl = await createShortUrl(fullUrl)
    res.status(201).send(shortUrl)
  } catch (error) {
    console.log('short url controller error: ', error)
    return res.status(500).send({ message: "Something went wrong!" })
  }
}

export const updateUrl = async(req: express.Request, res: express.Response) => {
  try {
    const { id: idUrl } = req.params
    const { alias } = req.body
    
    const shortUrl = await getUrlById(idUrl)
    if (!shortUrl) return res.status(404).send({ message: "Short url not found!" })

    shortUrl.alias = alias
    await shortUrl.save()

    res.status(201).send(shortUrl)
  } catch (error) {
    console.log('short url controller error: ', error)
    return res.status(500).send({ message: "Something went wrong!" })
  }
}

export const removeUrl = async(req: express.Request, res: express.Response) => {
  const idUrl = req.params.id

  try {
    const response = await removeShortUrl(idUrl)
    if (!response) return res.status(404).send({ message: "Short url not found" })

    res.status(204).send({ message: "Requested URL successfully deleted" })
  } catch (error) {
    console.log('short url controller error: ', error)
    return res.status(500).send({ message: "Something went wrong!" })
  }
}