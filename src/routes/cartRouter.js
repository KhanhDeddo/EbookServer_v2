import express from 'express'
import { cartController } from '~/controllers/cartController'
const Router = express.Router()

Router.route('/')
  .get(cartController.getCart)
  .post(cartController.createCart)

export const cartRouter = Router