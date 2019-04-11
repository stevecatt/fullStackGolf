const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({ extended: false }))

router.get('/score-logic', (req,res) => {
  res.render('score-logic')
})

let players =
{
  t1P1: {
    name: "Bill",
    quota: 27,
    overUnder: 0,
    currentScore: 0,
    played: false

  },
  t1P2: {
    name: "Bob",
    quota: 23,
    overUnder: 0,
    currentScore: 0,
    played: false
  },
  t2P1: {
    name: "Ben",
    quota: 11,
    overUnder: 0,
    currentScore: 0,
    played: false
  },
  t2P2: {
    name: "Beck",
    quota: 17,
    overUnder: 0,
    currentScore: 0,
    played: false
  }
}


router.post('/input-score-logic', (req,res) => {
  players.t1P1.currentScore = req.body.score1
  players.t1P2.currentScore = req.body.score2
  players.t2P1.currentScore = req.body.score3
  players.t2P2.currentScore = req.body.score4
  players.t1P1.overUnder = players.t1P1.currentScore - players.t1P1.quota
  players.t1P2.overUnder = players.t1P2.currentScore - players.t1P2.quota
  players.t2P1.overUnder = players.t2P1.currentScore - players.t2P1.quota
  players.t2P2.overUnder = players.t2P2.currentScore - players.t2P2.quota
  let teamOnePoints = 0
  let teamTwoPoints = 0
  let t1APlayer = ""
  let t2APlayer = ""
  let t1BPlayer = ""
  let t2BPlayer = ""
  if(players.t1P1.quota > players.t1P2.quota){
    t1APlayer = players.t1P1
    t1BPlayer = players.t1P2
  } else {
    t1APlayer = players.t1P2
    t1BPlayer = players.t1P1
  }
  if(players.t2P1.quota > players.t2P2.quota){
    t2APlayer = players.t2P1
    t2BPlayer = players.t2P2
  } else {
    t2APlayer = players.t2P2
    t2BPlayer = players.t2P1
  }

  //Calculating an empty input of score - i.e., a no-show
  if(t1APlayer.overUnder > t2APlayer.overUnder){
    teamOnePoints += 3
  } else if (t1APlayer.overUnder < t2APlayer.overUnder) {
    teamTwoPoints += 3
  } else {
    teamOnePoints += 1.5
    teamTwoPoints += 1.5
  }
  if(t1BPlayer.overUnder > t2BPlayer.overUnder){
    teamOnePoints += 3
  } else if (t1BPlayer.overUnder < t2BPlayer.overUnder) {
    teamTwoPoints += 3
  } else {
    teamOnePoints += 1.5
    teamTwoPoints += 1.5
  }
  //Calculating team points awarded
  let teamOneOverUnder = t1APlayer.overUnder + t1BPlayer.overUnder
  let teamTwoOverUnder = t2APlayer.overUnder + t2BPlayer.overUnder
  if (teamOneOverUnder > teamTwoOverUnder){
    teamOnePoints += 4
  } else if (teamOneOverUnder < teamTwoOverUnder) {
    teamTwoPoints += 4
  } else {
    teamOnePoints += 2
    teamTwoPoints += 2
  }
  console.log("Team 1 A player:", t1APlayer)
  console.log("Team 1 B player:",t1BPlayer)
  console.log("Team 2 A player:",t2APlayer)
  console.log("Team 2 B player:",t2BPlayer)
  console.log("Team One total points", teamOnePoints)
  console.log("Team Two total points", teamTwoPoints)
  res.redirect('/score-logic')
})


module.exports = router
