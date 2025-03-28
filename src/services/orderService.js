import { Book, Order, OrderItem, User } from '~/models/relations'

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
        },
        {
          model:User
          // attributes:['username']
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
            attributes: ['title', 'image_url', 'price']
          }
        ]
      },
      {
        model:User
        // attributes:['username']
      }
    ]
  })
  return orders
}

const moment = require('moment')
const createOrder = async (reqBody) => {
  const transID = `${moment().format('YYMMDD')}_${Math.floor(Math.random() * 1000000)}`
  const { user_id, name, phone, address, delivery_infor_id, customer_infor_id, status, total_price, discount_applied, final_price, payment_method, payment_status } = reqBody
  const newOrder = await Order.create({ transID,
    user_id, name, phone, address,
    delivery_infor_id,
    customer_infor_id,
    status, total_price,
    discount_applied, final_price,
    payment_method, payment_status
  })
  return newOrder
}
const updateOrder = async (reqBody) => {
  const { transID, order_id, name, phone, address, delivery_infor_id, status, total_price, discount_applied, final_price, payment_method, payment_status } = reqBody
  const newOrder = await Order.update(
    {
      name, phone, address, transID,
      delivery_infor_id,
      status, total_price,
      discount_applied, final_price,
      payment_method, payment_status
    },
    { where: { order_id } }
  )
  return newOrder
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