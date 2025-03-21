const { DataTypes } = require('sequelize')
const sequelize = require('~/config/mysqldb')

const Cart = sequelize.define('Cart', {
  cart_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
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
  tableName: 'cart',
  timestamps: false
})

module.exports = Cart
