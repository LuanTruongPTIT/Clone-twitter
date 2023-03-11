const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const Blog = require('./models/blog')
const userRouter = require('./routers/user.router');
const homeRouter = require('./routers/home.router')
const configViewEngine = require('./config/viewEngine')
require('dotenv').config();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const connection = require('./config/database');
// const doc = new Blog({ title: "Truong Dinh Kim Luan" });
configViewEngine(app)
app.use(userRouter);
app.use(homeRouter);
// doc.save();
(async () => {
  try {
    await connection();
    app.listen(port, () => {
      console.log(`App is listen ${port}`)
    })
  } catch (error) {
    console.log(error)
  }
})()