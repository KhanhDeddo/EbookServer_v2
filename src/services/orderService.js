import Order from '~/models/order'

const getOrder = async (req) => {
  const hehe = await Order.findAll()
  return hehe
}
const createOrder = async (reqBody) => {
  const { category_id, delivery_infor_id, customer_infor_id, status, total_price, discount_applied, final_price } = reqBody
  const newOrder = await Order.create({
    category_id,
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

export const orderService = {
  getOrder,
  createOrder,
  updateOrder
}