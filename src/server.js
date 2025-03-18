/* eslint-disable no-console */
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddlewares'
import express from 'express'
import API from '~/routes'

const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())
app.use('/', API)
app.use(errorHandlingMiddleware)

app.listen(3000, () => console.log('Server chạy tại http://localhost:3000'))
