import { CartItem } from '~/models/relations'
import ApiError from '~/utils/ApiError'

const getCartItem = async (req) => {
  try {
    const { cart_id, book_id } = req.query
    const cartItem = await CartItem.findAll({ where:{ cart_id } })
    return cartItem
  } catch (error) {
    throw new ApiError(400, new Error(error).message)
  }
}

const createCartItem = async (reqBody) => {
  const { cart_id, book_id, quantity, price_at_time } = reqBody
  try {
    const newcartItem = await CartItem.create({ cart_id, book_id, quantity, price_at_time })
    return newcartItem
  } catch (error) {
    throw new ApiError(400, error.message)
  }
}
const updateCartItem = async (reqBody) => {
  const { cart_id, book_id, quantity, price_at_time } = reqBody
  try {
    const cartItem = await CartItem.update({ cart_id, book_id, quantity, price_at_time })
    return cartItem
  } catch (error) {
    throw new ApiError(400, error.message)
  }
}
export const cartItemService = {
  getCartItem,
  createCartItem,
  updateCartItem
}