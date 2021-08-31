const {NOT_FOUND, BAD_REQUEST, CONFLICT, OK, NO_CONTENT} = require('http-status');
const router = require('express').Router()
const { db } = require("./firebase.js")
const {validate} = require('./regExp')
const db_urls = db.collection('urls');


router.get('/favicon.ico', (req, res) => res.status(NO_CONTENT));

router.use(async (req,res,next) => {
  const ip = req.headers['x-forwarded-for'] || req.ip;
  const url = req.url
  console.log(`[LOG] ${url} from ${ip}`)
  const _res = await db.collection("log").add({ip, url})
  next()
})

router.get("/:url", async (req, res, next) => {
const { url } = req.params
const snapshot = await db_urls.where("short", "==", url).limit(1).get()

if(snapshot.empty){
  res.sendStatus(NOT_FOUND)
  return
}

let resolved;

snapshot.forEach(doc => {
  resolved = doc.data().long
});

res.redirect(resolved)
})

router.post("/create", async (req,res) => {
  const {short, long} = req.body

  if(!long && !short){
    res.status(BAD_REQUEST)
    res.send({code: BAD_REQUEST, error: "Bad Request!"})
    return
  }

  if(validate(long, "URL")){
    res.status(BAD_REQUEST)
    res.send({code: BAD_REQUEST, error: "Bad Request!"})
    return
  }

  const snapshot = await db_urls.where("short", "==", short).get()
  if(!snapshot.empty){
    res.status(CONFLICT)
    res.send({code: CONFLICT, error: "Short url exists!"})
    return
  }


  const ip = req.headers['x-forwarded-for'] || req.ip;
  const _res = await db.collection("urls").add({short, long, ip})

  res.send({code: OK, id: _res.id, short, long})

})

module.exports = router

