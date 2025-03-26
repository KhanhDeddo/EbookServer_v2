/* eslint-disable quotes */
require('dotenv').config()
const express = require('express')
const axios = require('axios')
const CryptoJS = require('crypto-js')
import { Order } from '~/models/relations'
// const moment = require('moment')

const Router = express.Router()

const config = {
  app_id: process.env.ZALOPAY_APP_ID,
  key1: process.env.ZALOPAY_KEY1,
  key2: process.env.ZALOPAY_KEY2,
  endpoint: "https://sb-openapi.zalopay.vn/v2/create"
}

const embed_data = { "redirecturl": "https://ebook-v2.vercel.app/orders" }

Router.post('/zalopay', async (req, res) => {
  try {
    const { amount, username, transID } = req.body

    if (!amount || !username) {
      return res.status(400).json({ message: "Thiếu thông tin thanh toán!" })
    }

    // const transID = `${moment().format('YYMMDD')}_${Math.floor(Math.random() * 1000000)}`
    const order = {
      app_id: config.app_id,
      app_trans_id: `${transID}`,
      app_user: username,
      app_time: Date.now(),
      item: JSON.stringify([]),
      embed_data: JSON.stringify(embed_data),
      amount: amount,
      description: `Thanh toán đơn hàng #${transID}`,
      bank_code: "",
      callback_url: `${process.env.SERVER_URL}/zalopay-callback`
    }

    // 🔐 Tạo chữ ký (MAC)
    const data = `${config.app_id}|${order.app_trans_id}|${order.app_user}|${order.amount}|${order.app_time}|${order.embed_data}|${order.item}`
    order.mac = CryptoJS.HmacSHA256(data, config.key1).toString()

    // 📡 Gửi request đến ZaloPay
    const response = await axios.post(config.endpoint, null, { params: order })

    return res.status(200).json({ pay_url: response.data.order_url })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Lỗi khi tạo đơn hàng ZaloPay:", error.message)
    return res.status(500).json({ message: "Lỗi hệ thống, vui lòng thử lại!" })
  }
})

Router.post("/zalopay-callback", async (req, res) => {
  try {
    console.log("Request Body:", req.body)
    const parsedData = JSON.parse(req.body.data)
    const app_trans_id = parsedData.app_trans_id
    console.log("Extracted app_trans_id:", app_trans_id)
    if (!app_trans_id) {
      return res.status(400).json({ message: "Thiếu app_trans_id" })
    }
    const dataToUpdate = {
      payment_status: "Đã thanh toán",
      status: "Đã xác nhận"
    }
    const updatedOrder = await Order.update(dataToUpdate, {
      where: { transID: app_trans_id }
    })
    if (updatedOrder[0] === 0) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" })
    }
    console.log("ZaloPay Callback Data:", req.body)
    return res.status(200).json({ message: "Callback nhận thành công" })
  } catch (error) {
    console.error("Lỗi callback:", error.message)
    return res.status(500).json({ message: "Lỗi hệ thống" })
  }
})

module.exports = Router
