import express from 'express'
const Router = express.Router()

Router.route('/')
  .get()
  .post()
  .put()

export const categoryRouter = Router