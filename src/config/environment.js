require('dotenv').config()
export const env = {
  DB_HOST:process.env.DB_HOST,
  DB_NAME:process.env.DB_NAME,
  DB_USER:process.env.DB_USER,
  DB_PASSWORD:process.env.DB_PASSWORD,
  BUILD_MODE: process.env.BUILD_MODE
}
