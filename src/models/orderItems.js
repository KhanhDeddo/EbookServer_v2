const { DataTypes } = require('sequelize')
const sequelize = require('~/config/mysqldb')
const OrderItem = sequelize.define('OrderItem',
  {
    order_item_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    unit_price: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    discount_price: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    total_price: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    cart_item_id: {
      type: DataTypes.INTEGER,
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
  },
  {
    tableName:'order_item',
    timestamps: false
  }
)
module.exports = OrderItem
