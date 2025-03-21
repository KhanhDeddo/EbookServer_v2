import { Category } from '~/models/relations'
import ApiError from '~/utils/ApiError'

const getCategory = async () => {
  try {
    const data = await Category.findAll()
    return data
  } catch (error) {
    throw new ApiError(400, error.message)
  }
}
const createCategory = async (reqBody) => {
  try {
    const { name } = reqBody
    const newCategory = await Category.create({ name })
    return newCategory
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      throw new ApiError(409, 'Tên danh mục đã tồn tại. Vui lòng sử dụng tên danh mục khác.')
    }
    throw new ApiError(400, error.message)
  }
}

export const categoryService = {
  getCategory,
  createCategory
}