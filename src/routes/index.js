import express from 'express'
import { statusDBRouter } from './statusDBRouter'
import { userRouter } from './userRouter'
import { bookRouter } from './productRouter'
const Router = express.Router()

Router.use('/status-db', statusDBRouter)
Router.use('/users', userRouter)
Router.use('/books', bookRouter)

export default Router