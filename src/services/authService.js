import ApiError from '~/utils/ApiError'
import bcrypt from 'bcrypt'
import { User } from '~/models/relations'
const authUser = async (reqBody) => {
  try {
    const { email, password } = reqBody
    if (!email || !password) {
      throw new ApiError(400, 'Email và mật khẩu không được để trống')
    }

    const user = await User.findOne({ where: { email } })
    if (!user) throw new ApiError(404, 'Tài khoản không tồn tại')
    if (user.status === 'banner') throw new ApiError(404, 'Tài khoản của bạn đã bị khóa')

    const isMatch = await bcrypt.compare(password, user.password_hash)
    if (!isMatch) throw new ApiError(401, 'Sai mật khẩu')
    // eslint-disable-next-line no-unused-vars
    const { password_hash, ...userData } = user.get()
    return userData
  } catch (e) {
    throw new ApiError(e.statusCode || 400, e.message)
  }
}

export const authService = { authUser }
