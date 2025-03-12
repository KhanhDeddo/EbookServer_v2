import { Op } from 'sequelize'
import Book from '~/models/books'
import Category from '~/models/category'
import ApiError from '~/utils/ApiError'

const getBook = async (reqQuery) => {
  try {
    const { search } = reqQuery
    let whereCondition = {}
    if (search) {
      const normalizedSearch = `%${search.trim().toLowerCase()}%`
      whereCondition = {
        [Op.or]: [
          { title: { [Op.like]: normalizedSearch } },
          { '$category.name$': { [Op.like]: normalizedSearch } } // Tránh Sequelize.literal để an toàn
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
    return books.map(book => ({
      ...book.get({ plain: true }),
      id: book.book_id,
      category: book.category ? book.category.name : null
    }))
  } catch (error) {
    throw new ApiError(400, new Error(error).message)
  }
}

const createBook = async (reqBody) => {
  try {
    let {
      author, category_name, description, image_url,
      price, publisher, status, stock, supplier, title
    } = reqBody

    // ✅ Ép kiểu dữ liệu
    price = price ? parseFloat(price) : 0// Ép price thành số thực
    stock = stock ? parseInt(stock, 10) : 0// Ép stock thành số nguyên

    // ✅ Xử lý category_id
    let category_id = null
    if (category_name) {
      const category = await Category.findOne({ where: { name: category_name } })
      if (!category) {
        throw new ApiError(404, 'Category not found')
      }
      category_id = category.category_id
    }

    // ✅ Tạo sách mới
    const newBook = await Book.create({
      author, category_id, description, image_url,
      price, publisher, status, stock, supplier, title
    })

    return newBook
  } catch (error) {
    throw new ApiError(400, error.message)
  }
}


const updateBook = async (reqBody) => {
  try {
    let { book_id, author, category_name, description, image_url, price, publisher, status, stock, supplier, title } = reqBody
    // if (!book_id) {throw new ApiError(400, 'Book ID is required')}
    const book = await Book.findByPk(book_id)
    price = price ? parseFloat(price) : 0// Ép price thành số thực
    stock = stock ? parseInt(stock, 10) : 0// Ép stock thành số nguyên
    // if (!book) {throw new ApiError(404, 'Book not found')}
    let category_id = null
    if (category_name) {
      const category = await Category.findOne({ where: { name: category_name } })
      if (!category) {
        throw new ApiError(404, 'Category not found')
      }
      category_id = category.category_id
    }
    // Cập nhật thông tin sách
    await book.update({ title, category_id, author, description, image_url, price, publisher, status, stock, supplier })
    // Lấy thông tin mới sau khi cập nhật
    const updatedBook = await Book.findByPk(book_id, {
      attributes: { exclude: ['category_id'] },
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['name']
        }
      ]
    })

    return {
      ...updatedBook.get({ plain: true }),
      id: updatedBook.book_id,
      category: updatedBook.category ? updatedBook.category.name : null
    }
  } catch (error) {
    throw new ApiError(400, error.message)
  }
}


export const productService = {
  getBook,
  createBook,
  updateBook
}