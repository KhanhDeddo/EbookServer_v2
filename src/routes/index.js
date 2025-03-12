import express from 'express'
import { statusDBRouter } from './statusDBRouter'
import { userRouter } from './userRouter'
import { productRouter } from './productRouter'
const Router = express.Router()

Router.use('/status-db', statusDBRouter)
Router.use('/users', userRouter)
Router.use('/books', productRouter)

export default Router