import { OrderItem } from '~/models/relations'
import ApiError from '~/utils/ApiError'

const getOrderItem = async (req) => {
  const hehe = await OrderItem.findAll()
  return hehe
}
const createOrderItem = async (reqBody) => {
  try {
    const { order_id, book_id, quantity, unit_price, discount_price, total_price } = reqBody
    const newOrderItem = await OrderItem.create({
      order_id, book_id, quantity, unit_price, discount_price, total_price
    })
    return newOrderItem
  } catch (e) {
    throw new ApiError(400, 'Lỗi tạo orderItem: '+e.message)
  }
}
const updateOrderItem = async (req) => {
  return { message: 'đã vào service OrderItem' }

}

export const orderItemService = {
  getOrderItem,
  createOrderItem,
  updateOrderItem

}