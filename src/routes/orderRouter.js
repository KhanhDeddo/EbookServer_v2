import express from 'express'
import { orderController } from '~/controllers/orderController'
const Router = express.Router()

Router.route('/')
  .get(orderController.getOrder)
  .post(orderController.createOrder)
  .put(orderController.updateOrder)
  .delete(orderController.deleteOrder)

Router.route('/:id')
  .get(orderController.getOrder)
  .post(orderController.createOrder)
  .put(orderController.updateOrder)
export const orderRouter = Router