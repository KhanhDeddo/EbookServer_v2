/* eslint-disable no-unused-vars */
import { StatusCodes } from 'http-status-codes'
// Middleware xử lý lỗi tập trung trong ứng dụng Back-end NodeJS (ExpressJS)
export const errorHandlingMiddleware = (err, req, res, next) => {
  if (!err.statusCode) err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR
  const responseError = {
    statusCode: err.statusCode,
    message: err.message || StatusCodes[err.statusCode],
    stack: err.stack
  }
  // eslint-disable-next-line no-console
  console.error(responseError)
  // Trả responseError về phía Front-end
  res.status(responseError.statusCode).json(responseError)
}