const {NOT_FOUND, BAD_REQUEST, CONFLICT} = require('http-status');
const router = require('express').Router()
const { db } = require("./firebase.js")
const {validate} = require('./regExp')
const db_urls = db.collection('urls');

router.get('/favicon.ico', (req, res) => res.status(204));

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
  const {short, long} = req.query

  if(!long && !short){
    res.sendStatus(BAD_REQUEST)
    return
  }

  if(validate(long, "URL")){
    res.sendStatus(BAD_REQUEST)
    return
  }

  const snapshot = await db_urls.where("short", "==", short).get()
  if(!snapshot.empty){
    res.status(CONFLICT)
    res.send("Short url exists!")
    return
  }

  const _res = await db.collection("urls").add({short, long})

  res.send({id: _res.id, short, long})

})

module.exports = router

