const { DataTypes } = require('sequelize')
const sequelize = require('~/config/mysqldb')
const Category = require('./category')

const Book = sequelize.define('Book', {
  book_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Category,
      key: 'category_id'
    },
    onDelete: 'CASCADE'
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING(50),
    allowNull: true,
    defaultValue: 'Đang bán'
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  image_url: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  author: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  supplier: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  publisher: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  description: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  create_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  update_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName:'book',
  timestamps: false
})
Book.belongsTo(Category, { foreignKey: 'category_id', as: 'category' })
Category.hasMany(Book, { foreignKey: 'category_id', as: 'books' })
module.exports = Book
