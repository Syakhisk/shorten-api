const express = require('express')
const cors = require('cors')
const routes = require("./routes.js")
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50 // max per windowms
});

const app = express()
app.use(express.static("public"))
app.use(limiter);
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(routes)


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})
