import { userService } from '~/services/userService'

const getUser = async (req, res, next) => {
  try {
    const getUser = await userService.getUser(req)
    return res.status(200).json(getUser)
  } catch (error) {
    next(error)
  }
}

const createUser = async (req, res, next) => {
  try {
    const createUser = await userService.createUser(req.body)
    return res.status(201).json(createUser)
  } catch (error) {
    next(error)
  }
}

const updateUser = async (req, res, next) => {
  try {
    const updateUser = await userService.updateUser(req.body)
    return res.status(200).json(updateUser)
  } catch (error) {
    next(error)
  }
}

export const userController = {
  getUser,
  createUser,
  updateUser
}