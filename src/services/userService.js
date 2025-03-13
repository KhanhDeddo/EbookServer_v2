import ApiError from '~/utils/ApiError'

const bcrypt = require('bcrypt')
const User = require('~/models/users')

const getUser = async (req) => {
  try {
    const { id } = req.params
    if (id) { // Trường hợp: Lấy 1 user theo id
      const user = await User.findByPk(id)
      if (!user) {
        return { message:'éo có data' }
      }
      return user
    } else {
      // Trường hợp: Lấy danh sách user
      return await User.findAll()
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
  }
}
const createUser = async (reqBody) => {
  try {
    const { username, email, phone, image_url, gender, role, birthday, address, password } = reqBody
    // Kiểm tra xem email hoặc phone đã tồn tại chưa
    // const existingUser = await User.findOne({ where: { email } }) || await User.findOne({ where: { phone } })
    // if (existingUser) {
    //   return status(400).json({ message: 'Email hoặc số điện thoại đã được sử dụng' })
    // }
    // Hash password
    const saltRounds = 10
    const password_hash = await bcrypt.hash(password, saltRounds)
    const newUser = await User.create({
      username,
      image_url,
      email,
      phone,
      gender,
      role,
      birthday,
      address,
      password_hash
    })
    return newUser
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    throw new ApiError(400, error.message)
  }
}
const updateUser = async (reqBody) => {
  try {
    const { user_id, username, email, phone, image_url, gender, role, birthday, address } = reqBody
    const user = await User.findByPk(user_id)
    await user.update({ username, email, phone, image_url, gender, role, birthday, address })
    return user
  } catch (error) {
    throw new Error(error.message)
  }
}

export const userService = {
  getUser,
  createUser,
  updateUser
}
