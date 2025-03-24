import { Order, OrderItem } from '~/models/relations'

const getOrder = async (req) => {
  const { user_id } = req.query
  let whereCondition = user_id?{ user_id }:{}
  const hehe = await Order.findAll(
    { include: [{ model: OrderItem }] },
    { where:whereCondition }
  )
  return hehe
}
const createOrder = async (reqBody) => {
  const { user_id, name, phone, address, delivery_infor_id, customer_infor_id, status, total_price, discount_applied, final_price } = reqBody
  const newOrder = await Order.create({
    user_id, name, phone, address,
    delivery_infor_id,
    customer_infor_id,
    status, total_price,
    discount_applied, final_price
  })
  return newOrder
}
const updateOrder = async (req) => {
  return { massage: 'đã vô orderService' }
}
const deleteOrder = async (reqBody) => {
  const { order_id } = reqBody
  const delOrder = Order.destroy({
    where:{order_id}
  })
  return delOrder
}
export const orderService = {
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder
}