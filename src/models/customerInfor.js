const { DataTypes } = require('sequelize')
const sequelize = require('~/config/mysqldb')

const CustomerInfor = sequelize.define('CustomerInfor', {
  customer_infor_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  addressType: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  address: {
    type: DataTypes.STRING(200),
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
  timestamps: true,
  createdAt: 'create_at',
  updatedAt: 'update_at'
})

module.exports = CustomerInfor
