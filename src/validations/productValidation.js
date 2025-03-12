import Joi from 'joi'
import ApiError from '~/utils/ApiError'

const createProduct = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(5).max(100).trim().strict(),
    category_name: Joi.string().required().min(5).max(100).trim().strict(),
    description: Joi.string().min(0).max(200).trim().strict()
  })
  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false, allowUnknown: true })
    next()
  }
  catch (error) {
    next(new ApiError(422, new Error(error).message))
  }
}
const updateProduct = (req, res, next) => {
  try {
    next()
  }
  catch (error) {
    next(new ApiError(400, new Error(error).message))
  }
}
export const productValidation = {
  createProduct,
  updateProduct
}