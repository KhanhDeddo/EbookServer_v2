import express from 'express'
import { productController } from '~/controllers/productController'
import { productValidation } from '~/validations/productValidation'
const Router = express.Router()

Router.route('/')
  .get(productController.getProduct)
  .post(productValidation.createProduct, productController.createProduct)
  .put(productValidation.updateProduct, productController.updateProduct)

export const productRouter = Router
