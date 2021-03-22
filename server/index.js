const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const config = require('config')
const fileUpload = require('express-fileupload')
const authRuoter = require('./routes/auth.routes')
const fileRuoter = require("./routes/file.routes");
const courseRuoter = require("./routes/course.routes");
const cors = require('./middleware/cors.middleware')
const filepathMiddleware = require('./middleware/filepath.middleware')

const app = express()
const PORT = config.get("serverPort");

app.use(fileUpload({}))
app.use(cors)
app.use(filepathMiddleware(path.resolve(__dirname, 'files')))
app.use(express.json())
app.use(express.static("files/static"))
app.use("/api/auth", authRuoter)
app.use("/api/files", fileRuoter)
app.use("/api/courses", courseRuoter);

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
