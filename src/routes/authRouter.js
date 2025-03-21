import express from 'express'
import { authController } from '~/controllers/authController'
const Router = express.Router()

Router.route('/')
  .post(authController.authUser)

export const authRouter = Router