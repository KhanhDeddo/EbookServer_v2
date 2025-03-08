import express from 'express'
import sequelize from '~/config/mysqldb'
const Router = express.Router()

Router.route('/')
  .get(async (req, res) => {
    try {
      await sequelize.authenticate()
      res.status(200).json({ message: 'Kết nối MySQL bằng Sequelize thành công!' })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  })

export const statusDBRouter = Router