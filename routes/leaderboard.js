const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({ extended: false }))

router.get('/leaderboard', (req, res) => {
  db.any('SELECT team, player_one, player_two, points FROM teams ORDER BY points desc;')
  .then((teams) => {
    res.render('leaderboard', {teams:teams})
  })
})

module.exports = router
