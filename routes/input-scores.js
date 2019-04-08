const express = require('express')
const bodyParser = require('body-parser')
const pgp = require('pg-promise')()
const router = express.Router()

router.use(bodyParser.urlencoded({ extended: false }))

router.get('/input-scores', (req, res) => {
  res.render('input-scores')
})

router.post('/add-player', (req, res) => {
  let playerName = req.body.playerName
  let score = parseInt(req.body.score)
  console.log(playerName)

  db.one('INSERT INTO "Quotas"(golfer, q1) VALUES($1, $2) RETURNING id', [playerName, score])
  .then((data) => {
    console.log(data)
    console.log("SUCCESS")
  }).catch(error => console.log(error))
  res.render('input-scores', {message: "The player's score has been added."})
 })

module.exports = router
