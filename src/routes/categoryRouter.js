import express from 'express'
import Category from '~/models/category'
const Router = express.Router()

Router.route('/')
  .get( async (req, res, next) => {
    try {
      const data = await Category.findAll()
      return res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  })
  .post()
  .put()

export const categoryRouter = Router