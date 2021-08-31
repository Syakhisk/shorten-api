const express = require('express')
const cors = require('cors')
const routes = require("./routes.js")

const app = express()
app.use(express.static("public"))
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(routes)


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})
