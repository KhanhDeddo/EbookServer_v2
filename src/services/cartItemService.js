import { CartItem } from '~/models/relations'
import ApiError from '~/utils/ApiError'

const getCartItem = async (req) => {
  try {
    const { cart_id } = req.query
    const cartItem = await CartItem.findAll({ where: { cart_id } })
    return cartItem
  } catch (error) {
    throw new ApiError(400, new Error(error).message)
  }
}

const createCartItem = async (reqBody) => {
  let { cart_id, book_id, quantity, price_at_time } = reqBody

  // Chuyển đổi về số
  cart_id = Number(cart_id)
  book_id = Number(book_id)
  quantity = Number(quantity)
  price_at_time = Number(price_at_time)

  try {
    const checkBook = await CartItem.findOne({ where: { cart_id, book_id } })
    let newCartItem

    if (checkBook) {
      await CartItem.update(
        { quantity: checkBook.quantity + quantity },
        { where: { cart_item_id: checkBook.cart_item_id } }
      )

      newCartItem = await CartItem.findOne({ where: { cart_item_id: checkBook.cart_item_id } }) // Lấy lại dữ liệu sau khi cập nhật
    } else {
      newCartItem = await CartItem.create({ cart_id, book_id, quantity, price_at_time })
    }

    return newCartItem
  } catch (error) {
    throw new ApiError(400, error.message)
  }
}

const updateCartItem = async (reqBody) => {
  const { cart_item_id, quantity, price_at_time } = reqBody
  try {
    const updated = await CartItem.update(
      { quantity, price_at_time },
      { where: { cart_item_id } }
    )

    if (updated[0] > 0) {
      return { success: true, message: 'Cập nhật thành công' }
    } else {
      return { success: false, message: 'Không tìm thấy cart_item_id' }
    }
  } catch (error) {
    throw new ApiError(400, error.message)
  }
}

const deleteCartItem = async (reqBody) => {
  const { cart_item_id } = reqBody
  try {
    const result = await CartItem.destroy({ where: { cart_item_id } })
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

export const cartItemService = {
  getCartItem,
  createCartItem,
  updateCartItem,
  deleteCartItem
}