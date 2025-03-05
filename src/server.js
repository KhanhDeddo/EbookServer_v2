const express = require('express')
const sequelize = require('~/config/mysqldb')
const Users = require('~/models/users')
const { postUser } = require('~/services/users')
const Book = require('~/models/books')
const Category = require('~/models/category')
const cors = require('cors')
const app = express()
app.use(express.json())

// Cấu hình CORS để cho phép tất cả domain truy cập API
app.use(cors())

// Nếu muốn giới hạn chỉ cho phép React frontend truy cập:
// app.use(
//   cors({
//     origin: 'http://localhost:5173', // Hoặc domain frontend của cưng
//     methods: ['GET', 'POST', 'PUT', 'ELETE'], // Các phương thức cho phép
//     credentials: true // Cho phép gửi cookie nếu cần
//   })
// )
app.get('/test-db', async (req, res) => {
  try {
    await sequelize.authenticate()
    res.json({ message: 'Kết nối MySQL bằng Sequelize thành công!' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})
app.get('/users', async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ['user_id', 'username', 'email'] // Chỉ lấy cột cần thiết
    })

    res.status(200).json(users)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})
app.use('/users', postUser)
app.get('/books', async (req, res) => {
  try {
    const books = await Book.findAll({
      attributes: { exclude: ['category_id'] }, // Ẩn category_id
      include: {
        model: Category,
        as: 'category',
        attributes: ['name'] // Chỉ lấy name từ Category
      }
      // raw: true, // Trả về object thuần
      // nest: true, // Gộp dữ liệu từ include vào object chính
      // limit: 10
    })
    const formattedBooks = books.map(book => {
      const { category, ...rest } = book.get({ plain: true })
      return {
        ...rest,
        category_name: category.name // Chỉ lấy `category_name`
      }
    })
    res.status(200).json(formattedBooks)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})


// eslint-disable-next-line no-console
app.listen(3000, () => console.log('Server chạy tại http://localhost:3000'))
