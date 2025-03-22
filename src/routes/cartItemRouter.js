import express from 'express'
import { cartItemController } from '~/controllers/cartItemController'
const Router = express.Router()

Router.route('/')
  .get(cartItemController.getCartItem)
  .post(cartItemController.createCartItem)
  .put(cartItemController.updateCartItem)
  .delete(cartItemController.deleteCartItem)


export const cartItemRouter = Router