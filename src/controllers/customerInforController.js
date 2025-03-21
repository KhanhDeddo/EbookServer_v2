import { CustomerInforService } from '~/services/customerInforService'

const getCustomerInfor = async (req, res, next) => {
  try {
    const getCustomerInfor = await CustomerInforService.getCustomerInfor(req)
    return res.status(200).json(getCustomerInfor)
  } catch (error) {
    next(error)
  }
}

const createCustomerInfor = async (req, res, next) => {
  try {
    const createCustomerInfor = await CustomerInforService.createCustomerInfor(req.body)
    return res.status(201).json(createCustomerInfor)
  } catch (error) {
    next(error)
  }
}

const updateCustomerInfor = async (req, res, next) => {
  try {
    const updateCustomerInfor = await CustomerInforService.updateCustomerInfor(req.body)
    return res.status(200).json(updateCustomerInfor)
  } catch (error) {
    next(error)
  }
}

export const customerInforController = {
  getCustomerInfor,
  createCustomerInfor,
  updateCustomerInfor
}