const Cart = require('./carts')
const CartItem = require('./cartItems')
const Book = require('./books')
const User = require('./users')
const Category = require('./categorys')
const Order = require('./order')
const OrderItem = require('./orderItems')
const sequelize = require('~/config/mysqldb')
const CustomerInfor = require('./customerInfor')


User.hasOne(Cart, { foreignKey: 'user_id', onDelete: 'CASCADE' })
Cart.belongsTo(User, { foreignKey: 'user_id' })

User.hasMany(CustomerInfor, { foreignKey: 'user_id', onDelete: 'CASCADE' })
CustomerInfor.belongsTo(User, { foreignKey: 'user_id' })

Category.hasMany(Book, { foreignKey: 'category_id', as: 'books', onDelete: 'CASCADE' })
Book.belongsTo(Category, { foreignKey: 'category_id', as: 'category' })

Cart.hasMany(CartItem, { foreignKey: 'cart_id', as: 'cartItems', onDelete: 'CASCADE' })
CartItem.belongsTo(Cart, { foreignKey: 'cart_id' })

Book.hasMany(CartItem, { foreignKey: 'book_id', onDelete: 'CASCADE' })
CartItem.belongsTo(Book, { foreignKey: 'book_id' })

Order.hasMany(OrderItem, { foreignKey: 'order_id', onDelete: 'CASCADE' })
OrderItem.belongsTo(Order, { foreignKey: 'order_id' })

Book.hasMany(OrderItem, { foreignKey: 'book_id', onDelete: 'CASCADE' })
OrderItem.belongsTo(Book, { foreignKey: 'book_id' })

CustomerInfor.hasMany(Order, { foreignKey: 'customer_infor_id', onDelete: 'CASCADE' })
Order.belongsTo(CustomerInfor, { foreignKey: 'customer_infor_id' })


sequelize.sync({ alter: true })
module.exports = { Cart, CartItem, Book, User, Category, Order, OrderItem, CustomerInfor }