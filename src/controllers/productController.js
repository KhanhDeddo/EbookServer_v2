import { productService } from '~/services/productService'

const getProduct = async (req, res, next) => {
  try {
    const getBook = await productService.getBook(req.query)
    return res.status(200).json(getBook)
  } catch (error) {
    next(error)
  }
}

const createProduct = async (req, res, next) => {
  try {
    const createBook = await productService.createBook(req.body)
    return res.status(201).json(createBook)
  } catch (error) {
    next(error)
  }
}

const updateProduct = async (req, res, next) => {
  try {
    const updateBook = await productService.updateBook(req.body)
    return res.status(200).json(updateBook)
  } catch (error) {
    next(error)
  }
}

export const productController = {
  getProduct,
  createProduct,
  updateProduct
}