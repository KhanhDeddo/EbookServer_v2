const { DataTypes } = require('sequelize')
const sequelize = require('~/config/mysqldb')

const Order = sequelize.define('Order',
  {
    order_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    transID: {
      type: DataTypes.STRING(30),
      allowNull:true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    delivery_infor_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    customer_infor_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    total_price: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    discount_applied: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    final_price: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    payment_method: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    payment_status: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue:'Chưa thanh toán'
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
    tableName:'orders',
    timestamps: false
  }
)
module.exports = Order
