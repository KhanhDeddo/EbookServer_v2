import express from 'express'
import { customerInforController } from '~/controllers/customerInforController'
const Router = express.Router()

Router.route('/')
  .get(customerInforController.getCustomerInfor)
  .post(customerInforController.createCustomerInfor)
  .put(customerInforController.updateCustomerInfor)

export const customerInforRouter = Router