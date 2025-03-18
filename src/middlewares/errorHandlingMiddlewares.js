/* eslint-disable no-unused-vars */
import { StatusCodes } from 'http-status-codes'
import { env } from '~/config/environment'

export const errorHandlingMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR

  const responseError = {
    success: false,
    statusCode,
    message: err.message || StatusCodes[statusCode]
  }

  // Chỉ log stack khi chạy ở chế độ dev
  if (env.BUILD_MODE === 'dev') {
    responseError.stack = err.stack
  }

  // eslint-disable-next-line no-console
  console.error(`[ERROR] ${statusCode}: ${err.message}`)

  res.status(statusCode).json(responseError)
}
