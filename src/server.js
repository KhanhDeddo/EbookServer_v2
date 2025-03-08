import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddlewares'
import express from 'express'
import API from '~/routes'
const cors = require('cors')
const app = express()

app.use(errorHandlingMiddleware)
app.use(express.json())
app.use(cors())
app.use('/', API)

// app.get('/users', async (req, res) => {
//   try {
//     const users = await Users.findAll({
//       attributes: ['user_id', 'username', 'email'] // Chỉ lấy cột cần thiết
//     })

//     res.status(200).json(users)
//   } catch (err) {
//     res.status(500).json({ error: err.message })
//   }
// })
// app.use('/users', postUser)
// eslint-disable-next-line no-console
app.listen(3000, () => console.log('Server chạy tại http://localhost:3000'))
