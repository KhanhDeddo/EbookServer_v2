import express from 'express'
import { orderItemController } from '~/controllers/orderItemController'
const Router = express.Router()

Router.route('/')
  .get(orderItemController.getOrderItem)
  .post(orderItemController.createOrderItem)
  .put(orderItemController.updateOrderItem)
export const orderItemRouter = Router