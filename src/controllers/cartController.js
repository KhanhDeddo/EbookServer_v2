import { cartService } from '~/services/cartService'

const getCart = async (req, res, next) => {
  try {
    const getCart = await cartService.getCart(req)
    return res.status(200).json(getCart)
  } catch (error) {
    next(error)
  }
}

const createCart = async (req, res, next) => {
  try {
    const createCart = await cartService.createCart(req.body)
    return res.status(201).json(createCart)
  } catch (error) {
    next(error)
  }
}

export const cartController = {
  getCart,
  createCart
}