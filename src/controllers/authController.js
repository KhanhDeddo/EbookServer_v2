import { authService } from '~/services/authService'

export const authUser = async (req, res, next) => {
  try {
    const data = await authService.authUser(req.body)
    return res.status(200).json(data)
  } catch (e) {next(e)}
}

export const authController = {
  authUser
}