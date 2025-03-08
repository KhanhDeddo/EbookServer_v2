const createProduct = (req, res, next) => {
  try {
    return res.status(201).json({ he:'đã vô controller' })
  } catch (error) {
    next(error)
  }
}

export const productController = {
  createProduct
}