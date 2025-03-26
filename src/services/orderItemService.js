import { OrderItem } from '~/models/relations'
import ApiError from '~/utils/ApiError'

const getOrderItem = async (req) => {
  const hehe = await OrderItem.findAll()
  return hehe
}
const createOrderItem = async (reqBody) => {
  try {
    const { order_id, book_id, quantity, unit_price, discount_price, total_price, cart_item_id } = reqBody
    const newOrderItem = await OrderItem.create({
      order_id, book_id, quantity, unit_price, discount_price, total_price, cart_item_id
    })
    return newOrderItem
  } catch (e) {
    throw new ApiError(400, 'Lỗi tạo orderItem: '+e.message)
  }
}
const updateOrderItem = async (req) => {
  return { message: 'đã vào service OrderItem' }

}

const deleteOrderItem = async (reqBody) => {
  const { cart_item_id } = reqBody
  try {
    const result = await OrderItem.destroy({ where: { cart_item_id } })
    if (result === 0) {
      throw new ApiError(404, 'Không tìm thấy cart_item để xóa')
    }
    return {
      success: true,
      message: 'Xóa sản phẩm thành công'
    }
  } catch (error) {
    throw new ApiError(400, error.message)
  }
}

export const orderItemService = {
  getOrderItem,
  createOrderItem,
  updateOrderItem,
  deleteOrderItem

}