import { productService } from '~/services/productService'

const getPayment = async (req, res, next) => {
  try {
    const getBook = await productService.getBook(req.query)
    return res.status(200).json(getBook)
  } catch (error) {
    next(error)
  }
}

const createPayment = async (req, res, next) => {
  try {
    const createBook = await productService.createBook(req.body)
    return res.status(201).json(createBook)
  } catch (error) {
    next(error)
  }
}

const updatePayment = async (req, res, next) => {
  try {
    const updateBook = await productService.updateBook(req.body)
    return res.status(200).json(updateBook)
  } catch (error) {
    next(error)
  }
}

export const paymentController = {
  getPayment,
  createPayment,
  updatePayment
}