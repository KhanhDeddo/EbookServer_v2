import express from 'express'
import { userController } from '~/controllers/userController'

const Router = express.Router()

// Route cho danh sách người dùng
Router.route('/')
  .get(userController.getUser)

// Route cho user theo ID
Router.route('/:id')
  .get(userController.getUser)
  .post(userController.getUser)
  .put(userController.updateUser)

export const userRouter = Router
