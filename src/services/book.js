const express = require('express')
const bcrypt = require('bcrypt')
const User = require('~/models/users')
const router = express.Router()

// Tạo một user mới
router.post('', async (req, res) => {
  try {
    const { username, email, phone, gender, role, birthday, address, password } = req.body
    // Kiểm tra xem email hoặc phone đã tồn tại chưa
    const existingUser = await User.findOne({ where: { email } }) || await User.findOne({ where: { phone } })
    if (existingUser) {
      return res.status(400).json({ message: 'Email hoặc số điện thoại đã được sử dụng' })
    }
    // Hash password
    const saltRounds = 10
    const password_hash = await bcrypt.hash(password, saltRounds)
    // Tạo user mới
    const newUser = await User.create({
      username,
      email,
      phone,
      gender,
      role,
      birthday,
      address,
      password_hash
    })
    res.status(201).json({ message: 'User created successfully', user: newUser })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

export const postUser = router
