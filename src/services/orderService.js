import { Book, Order, OrderItem } from '~/models/relations'

const getOrder = async (req) => {
  const { user_id, order_id } = req.query
  let whereCondition = {}
  if (user_id) whereCondition.user_id = user_id
  if (order_id) {
    whereCondition.order_id = order_id
    const order = await Order.findOne({
      where: whereCondition,
      include: [
        {
          model: OrderItem,
          include: [
            {
              model: Book,
              attributes: ['title', 'image_url', 'price']
            }
          ]
        }
      ]
    })
    return order
  }

  const orders = await Order.findAll({
    where: whereCondition,
    include: [
      {
        model: OrderItem,
        include: [
          {
            model: Book,
            attributes: ['title', 'image_url']
          }
        ]
      }
    ]
  })
  return orders
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
    where: { order_id }
  })
  return delOrder
}
export const orderService = {
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder
}