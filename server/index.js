const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const config = require('config')
const authRuoter = require('./routes/auth.routes')
const fileRuoter = require("./routes/file.routes");
const cors = require('./middleware/cors.middleware')
const filepathMiddleware = require('./middleware/filepath.middleware')

const app = express()
const PORT = config.get("serverPort");

app.use(cors)
app.use(filepathMiddleware(path.resolve(__dirname, 'files')))
app.use(express.json())
app.use("/api/auth", authRuoter)
app.use("/api/files", fileRuoter)

const start = async () => {
  try {
    await mongoose.connect(config.get('dbUrl'))
    app.listen(PORT, () => {
      console.log('Сервер запущен на порту ', PORT)
    })
  } catch (err) {

  }
}

start()
