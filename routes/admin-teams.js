const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const saltRounds = 10
const pgp = require('pg-promise')()

router.use(bodyParser.urlencoded({ extended: false }))

let teamMembers = []

router.get('/admin/add-teams', (req, res) => {
  res.render('add-teams')
})

router.post('/search-player-one', (req, res) => {
  let playerName = req.body.playerName
  db.any(`SELECT name FROM players WHERE LOWER(name) LIKE LOWER('${playerName}%')`).then((players) => {
    console.log(players)
    res.render('add-teams', {players: players, select: "Select"})
  })
})

router.post('/select-player-one', (req, res) => {
  console.log(req.body)
  let playerOne = req.body.player

  res.render('add-teams', {player1: playerOne, memberOne: playerOne})
})

router.post('/search-player-two', (req, res) => {
  let playerName = req.body.playerName
  let player1 = req.body.playerOne
  db.any(`SELECT name FROM players WHERE LOWER(name) LIKE LOWER('${playerName}%')`).then((players) => {
    console.log(players)
    res.render('add-teams', {players: players, player1: player1, memberOne: player1, select: 'Select'})
  })
})

router.post('/select-player-two', (req, res) => {
  let playerTwo = req.body.player
  let player1 = req.body.playerOne

  res.render('add-teams', {player2: playerTwo, player1: player1})
  })

router.post('/add-new-player', (req, res) => {
  let newPlayer = req.body.newPlayer
  console.log(newPlayer)
  db.one('INSERT INTO players(name) VALUES($1) RETURNING id;', [newPlayer])
  res.render('add-teams', {message3: 'New Player has been added!'})
  })

router.post('/add-teams', (req, res) => {
  let teamNumber = parseInt(req.body.teamNumber)
  let playerOne = req.body.playerOne
  let playerTwo = req.body.playerTwo
  let hash = bcrypt.hashSync(req.body.password, saltRounds)


  db.any('SELECT team FROM teams WHERE team = $1', [teamNumber]).then((team) => {
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
