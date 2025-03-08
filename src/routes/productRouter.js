import express from 'express'
import { Op, Sequelize } from 'sequelize'
import { productController } from '~/controllers/productController'
import Book from '~/models/books'
import Category from '~/models/category'
import { productValidation } from '~/validations/productValidation'
const Router = express.Router()

Router.route('/')
  .get( async (req, res) => {
    try {
      const { search } = req.query
      let whereCondition = {} // Mặc định lấy tất cả
      if (search) {
        const normalizedSearch = `%${search.trim().toLowerCase()}%`
        whereCondition = {
          [Op.or]: [
            { title: { [Op.like]: normalizedSearch } },
            Sequelize.literal(`LOWER(category.name) LIKE '${normalizedSearch}'`)
          ]
        }
      }
      const books = await Book.findAll({
        where: whereCondition,
        attributes: { exclude: ['category_id'] },
        include: [
          {
            model: Category,
            as: 'category',
            attributes: ['name']
          }
        ]
      })
      const formattedBooks = books.map((book) => {
        const { book_id, category, ...rest } = book.get({ plain: true })
        return {
          ...rest,
          id:book_id,
          category: category ? category.name : null
        }
      })
      res.status(200).json(formattedBooks)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  })
  .post(productValidation.createProduct, productController.createProduct)
  .put(productValidation.updateProduct)

export const bookRouter = Router
