import { orderService } from '~/services/orderService'

const getOrder = async (req, res, next) => {
  try {
    const getOrder = await orderService.getOrder(req)
    return res.status(200).json(getOrder)
  } catch (error) {
    next(error)
  }
}

const createOrder = async (req, res, next) => {
  try {
    const createOrder = await orderService.createOrder(req.body)
    return res.status(201).json(createOrder)
  } catch (error) {
    next(error)
  }
}

const updateOrder = async (req, res, next) => {
  try {
    const updateOrder = await orderService.updateOrder(req.body)
    return res.status(200).json(updateOrder)
  } catch (error) {
    next(error)
  }
}

const deleteOrder = async (req, res, next) => {
  try {
    const deleteOrder = await orderService.deleteOrder(req.body)
    return res.status(200).json(deleteOrder)
  } catch (error) {
    next(error)
  }
}

export const orderController = {
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder
}