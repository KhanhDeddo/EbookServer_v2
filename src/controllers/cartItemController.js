import { cartItemService } from '~/services/cartItemService'

const getCartItem = async (req, res, next) => {
  try {
    const getCart = await cartItemService.getCartItem(req)
    return res.status(200).json(getCart)
  } catch (error) {
    next(error)
  }
}

const createCartItem = async (req, res, next) => {
  try {
    const createCart = await cartItemService.createCartItem(req.body)
    return res.status(201).json(createCart)
  } catch (error) {
    next(error)
  }
}

const updateCartItem = async (req, res, next) => {
  try {
    const createCart = await cartItemService.updateCartItem(req.body)
    return res.status(200).json(createCart)
  } catch (error) {
    next(error)
  }
}

export const cartItemController = {
  getCartItem,
  createCartItem,
  updateCartItem
}