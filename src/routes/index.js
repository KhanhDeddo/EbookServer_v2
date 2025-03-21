import express from 'express'
import { statusDBRouter } from './statusDBRouter'
import { userRouter } from './userRouter'
import { productRouter } from './productRouter'
import { orderRouter } from './orderRouter'
import { cartRouter } from './cartRouter'
import { voucherRouter } from './voucherRouter'
import { categoryRouter } from './categoryRouter'
import { paymentRouter } from './paymentRouter'
import { emailRouter } from './emailRouter'
import { authRouter } from './authRouter'
import { cartItemRouter } from './cartItemRouter'
import { orderItemRouter } from './orderItemRouter'
import { customerInforRouter } from './customerInforRouter'

const Router = express.Router()
Router.use('/status-db', statusDBRouter)
Router.use('/auth', authRouter)
Router.use('/users', userRouter)
Router.use('/books', productRouter)
Router.use('/categories', categoryRouter)
Router.use('/orders', orderRouter)
Router.use('/carts', cartRouter)
Router.use('/vouchers', voucherRouter)
Router.use('/categories', categoryRouter)
Router.use('/payments', paymentRouter)
Router.use('/emails', emailRouter)
Router.use('/cart-items', cartItemRouter)
Router.use('/order-items', orderItemRouter)
Router.use('/customer-infors', customerInforRouter)

export default Router