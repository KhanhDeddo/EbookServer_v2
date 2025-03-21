import { orderItemService } from '~/services/orderItemService'
const getOrderItem = async (req, res, next) => {
  try {
    const getOrderItem = await orderItemService.getOrderItem(req)
    return res.status(200).json(getOrderItem)
  } catch (error) {
    next(error)
  }
}

const createOrderItem = async (req, res, next) => {
  try {
    const createOrderItem = await orderItemService.createOrderItem(req.body)
    return res.status(201).json(createOrderItem)
  } catch (error) {
    next(error)
  }
}

const updateOrderItem = async (req, res, next) => {
  try {
    const updateOrderItem = await orderItemService.updateOrderItem(req.body)
    return res.status(200).json(updateOrderItem)
  } catch (error) {
    next(error)
  }
}

export const orderItemController = {
  getOrderItem,
  createOrderItem,
  updateOrderItem
}