import express from 'express'
import { paymentController } from '~/controllers/paymentController'
const Router = express.Router()

Router.route('/')
  .get(paymentController.getPayment)
  .post(paymentController.createPayment)
  .put(paymentController.updatePayment)

export const paymentRouter = Router