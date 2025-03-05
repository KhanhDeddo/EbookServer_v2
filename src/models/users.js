const { DataTypes } = require('sequelize')
const sequelize = require('~/config/mysqldb')

const User = sequelize.define('User',
  {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true
    },
    gender: {
      type: DataTypes.ENUM('male', 'female')
    },
    role: {
      type: DataTypes.ENUM('customer', 'admin'),
      defaultValue: 'customer'
    },
    birthday: {
      type: DataTypes.DATE
    },
    address: {
      type: DataTypes.STRING(100)
    },
    password_hash: {
      type: DataTypes.STRING(255)
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
    tableName: 'user',
    timestamps: false
  }
)
sequelize.sync({ alter: false, force: false })
module.exports = User
