import { Book, Cart, CartItem } from '~/models/relations'
import ApiError from '~/utils/ApiError'
const getCart = async (req) => {
  try {
    const { user_id } = req.query
    let whereCondition = {}
    if (user_id) whereCondition = { user_id }
    const cartUser = await Cart.findOne({
      where: whereCondition,
      include: [
        {
          model: CartItem,
          as: 'cartItems',
          // attributes: ['cart_item_id', 'cart_id', 'book_id', 'quantity', 'price_at_time'],
          include: [{
            model:Book,
            attributes:['title', 'image_url', 'price']
          }]
        }
      ]
    })
    if (!cartUser) {
      throw new ApiError(404, 'Cart not found for this user')
    }
    return cartUser
  } catch (error) {
    throw new ApiError(400, error.message)
  }
}


const createCart = async (reqBody) => {
  const { user_id } = reqBody
  try {
    const newcart = await Cart.create({ user_id })
    return newcart
  } catch (error) {
    throw new ApiError(400, error.message)
  }
}
export const cartService = {
  getCart,
  createCart
}