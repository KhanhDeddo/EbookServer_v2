import express from 'express'
import { categoryController } from '~/controllers/categoryController'
const Router = express.Router()

Router.route('/')
  .get(categoryController.getCategory)
  .post(categoryController.createCategory)
  .put()

export const categoryRouter = Router