import { categoryService } from '~/services/categoryService'

const getCategory = async (req, res, next) => {
  try {
    const data = await categoryService.getCategory(req.query)
    return res.status(200).json(data)
  } catch (e) {next(e)}
}
const createCategory = async (req, res, next ) => {
  try {
    const data = await categoryService.createCategory(req.body)
    return res.status(201).json(data)
  } catch (e) { next(e) }
}
export const categoryController = {
  getCategory,
  createCategory
}