const express = require('express')
const sequelize = require('~/config/mysqldb')
const { Op, Sequelize } = require('sequelize')
const Users = require('~/models/users')
const { postUser } = require('~/services/users')
const Book = require('~/models/books')
const Category = require('~/models/category')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())

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
    const { search } = req.query;
    let whereCondition = {}; // Mặc định lấy tất cả

    if (search) {
      const normalizedSearch = `%${search.trim().toLowerCase()}%`;

      whereCondition = {
        [Op.or]: [
          { title: { [Op.like]: normalizedSearch } },
          Sequelize.literal(`LOWER(category.name) LIKE '${normalizedSearch}'`),
        ],
      };
    }

    const books = await Book.findAll({
      where: whereCondition,
      attributes: { exclude: ['category_id'] },
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['name'],
        },
      ],
    });

    const formattedBooks = books.map((book) => {
      const { book_id, category, ...rest } = book.get({ plain: true });
      return {
        ...rest,
        id:book_id,
        category: category ? category.name : null,
      };
    });

    res.status(200).json(formattedBooks);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: error.message });
  }
});






// eslint-disable-next-line no-console
app.listen(3000, () => console.log('Server chạy tại http://localhost:3000'))
