const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
require('dotenv').config()
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const PORT = process.env.PORT || 5000
const app = express()

mongoose.connect(process.env.MONGO_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

app.get('*', (req, res) => {
  res.status(404).send('Page not found')
})

app.listen(PORT)
