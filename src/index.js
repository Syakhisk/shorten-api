const express = require('express')
const cors = require('cors')
const routes = require("./routes.js")
const serverless = require('serverless-http')
const path = require('path')

const app = express()
app.use(cors())
app.use(express.json())
app.use(routes)


// const PORT = process.env.PORT || 3000

// app.listen(PORT, () => {
//   console.log(`Server listening on ${PORT}`)
// })

app.use("./netlify/functions/server", express.Router())
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));
module.exports=app
module.exports.handler = serverless(app)
