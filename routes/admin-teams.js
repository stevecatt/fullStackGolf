const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const saltRounds = 10
const pgp = require('pg-promise')()

router.use(bodyParser.urlencoded({ extended: false }))

router.get('/admin/add-teams', (req, res) => {
  res.render('add-teams')
})

router.post('/add-teams', (req, res) => {
  let teamNumber = parseInt(req.body.teamNumber)
  let playerOne = req.body.playerOne
  let playerTwo = req.body.playerTwo
  let hash = bcrypt.hashSync(req.body.password, saltRounds)

  db.any('SELECT team FROM teams where team = $1', [teamNumber]).then((team) => {
    if (team.length != 0) {
      res.render('add-teams', {message1: 'Team Number is taken! Please enter new Team Number.'})
    } else {
      db.one('INSERT INTO teams(team, player1, player2, hash) VALUES($1,$2,$3,$4) RETURNING id;', [teamNumber, playerOne, playerTwo, hash])
      res.render('add-teams', {message2: 'Team has been added!'})
    }
  })
  .catch((error) => {console.log("error in /add-teams")})
})

module.exports = router
