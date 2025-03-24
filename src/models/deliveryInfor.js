const { DataTypes } = require('sequelize')
const sequelize = require('~/config/mysqldb')

const DeliveryInfo = sequelize.define('DeliveryInfo', {
  delivery_infor_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  delivery_type: {
    type: DataTypes.STRING(50),
    allowNull: false,
    charset: 'utf8mb4'
  },
  delivery_fee: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  company: {
    type: DataTypes.STRING(50),
    allowNull: false,
    charset: 'utf8mb4'
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  address: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
  tableName: 'delivery_infor',
  timestamps: false
})

module.exports = DeliveryInfo
