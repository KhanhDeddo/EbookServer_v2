import express from 'express'
const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    return res.status(200).json({ Khanh:'Hello World' })
  })
  .post((req, res) => {
    return res.status(201).json({ Khanh:'Hello World post' })
  })
  .put((req, res) => {
    return res.status(200).json({ operator:'put' })
  })
export const userRouter = Router