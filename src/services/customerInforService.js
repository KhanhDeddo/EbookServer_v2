import ApiError from '~/utils/ApiError'
import { CustomerInfor } from '~/models/relations'
const getCustomerInfor = async (req) => {
  try {
    const { user_id } = req.query
    let whereCondition = {}
    if (user_id) whereCondition = { user_id }
    const CustomerInforOfUser = await CustomerInfor.findAll({
      where: whereCondition
    })
    return CustomerInforOfUser
  } catch (error) {
    throw new ApiError(400, error.message)
  }
}


const createCustomerInfor = async (reqBody) => {
  const { user_id, addressType, name, phone, email, address } = reqBody
  try {
    const newCustomerInfor = await CustomerInfor.create({ user_id, addressType, name, phone, email, address })
    return newCustomerInfor
  } catch (error) {
    throw new ApiError(400, error.message)
  }
}
const updateCustomerInfor = async (reqBody) => {
  const { addressType, name, phone, email, address } = reqBody
  try {
    const updateCustomerInfor = await CustomerInfor.update({ addressType, name, phone, email, address })
    return updateCustomerInfor
  } catch (error) {
    throw new ApiError(400, error.message)
  }
}

export const CustomerInforService = {
  getCustomerInfor,
  createCustomerInfor,
  updateCustomerInfor
}