const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({ extended: false }))

let players =
{
  t1P1: {
    name: "Bill",
    teamNumber: 17,
    quota: 30,
    overUnder: 0,
    played: true
  },
  t1P2: {
    name: "Bob",
    teamNumber: 17,
    quota: 30,
    overUnder: 0,
    played: true
  },
  t2P1: {
    name: "Ben",
    teamNumber: 22,
    quota: 30,
    overUnder: 0,
    played: true
  },
  t2P2: {
    name: "Beck",
    teamNumber: 22,
    quota: 30,
    overUnder: 0,
    played: true
  }
}
let teamOnePoints = 0
let teamTwoPoints = 0
let teamOneOverUnder = 0
let teamTwoOverUnder = 0

router.get('/score-logic', (req,res) => {
  teamOnePoints = 0
  teamTwoPoints = 0
  teamOneOverUnder = 0
  teamTwoOverUnder = 0
  res.render('score-logic', players)
})

router.post('/input-score-logic', (req,res) => {
  players.t1P1.played = isNoShow(req.body.onePlayed)
  players.t1P2.played = isNoShow(req.body.twoPlayed)
  players.t2P1.played = isNoShow(req.body.threePlayed)
  players.t2P2.played = isNoShow(req.body.fourPlayed)
  players.t1P1.overUnder = req.body.score1 - players.t1P1.quota
  players.t1P2.overUnder = req.body.score2 - players.t1P2.quota
  players.t2P1.overUnder = req.body.score3 - players.t2P1.quota
  players.t2P2.overUnder = req.body.score4 - players.t2P2.quota

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

  playerPoints(t1APlayer, t2APlayer)
  playerPoints(t1BPlayer, t2BPlayer)
  teamOneOverUnder = t1APlayer.overUnder + t1BPlayer.overUnder
  teamTwoOverUnder = t2APlayer.overUnder + t2BPlayer.overUnder
  teamPoints(t1APlayer, t1BPlayer, t2APlayer, t2BPlayer)

  console.log("Team 1 A player:", t1APlayer)
  console.log("Team 1 B player:",t1BPlayer)
  console.log("Team 2 A player:",t2APlayer)
  console.log("Team 2 B player:",t2BPlayer)
  console.log("Team One total points", teamOnePoints)
  console.log("Team Two total points", teamTwoPoints)
  res.redirect('/score-logic')
})

function isNoShow(boxValue) {
  console.log(boxValue)
  if (boxValue == 'false') {
    return false
  }
  else{
    return true
  }
}
function playerPoints(playerOne, playerTwo) {
  if(playerOne.played == false && playerTwo.played == false){
    playerOne.overUnder = -3
    playerTwo.overUnder = -3
    teamOnePoints += 0
    teamTwoPoints += 0
  } else if (playerOne.played == false){
    playerOne.overUnder = -3
    if(playerOne.overUnder > playerTwo.overUnder){
      teamOnePoints += 0
    } else if (playerOne.overUnder < playerTwo.overUnder) {
      teamTwoPoints += 3
    } else {
      teamOnePoints += 0
      teamTwoPoints += 1.5
    }
  } else if(playerTwo.played == false){
    playerTwo.overUnder = -3
    if(playerOne.overUnder > playerTwo.overUnder){
      teamOnePoints += 3
    } else if (playerOne.overUnder < playerTwo.overUnder) {
      teamTwoPoints += 0
    } else {
      teamOnePoints += 1.5
      teamTwoPoints += 0
    }
  } else if(playerOne.overUnder > playerTwo.overUnder){
    teamOnePoints += 3
  } else if (playerOne.overUnder < playerTwo.overUnder) {
    teamTwoPoints += 3
  } else {
    teamOnePoints += 1.5
    teamTwoPoints += 1.5
  }
}

function teamPoints(teamOnePlayerOne,teamOnePlayerTwo,teamTwoPlayerOne,teamTwoPlayerTwo) {
  if (teamOnePlayerOne.played == false){
    if(teamOnePlayerTwo.played == false){
      if (teamTwoPlayerOne.played == false && teamTwoPlayerTwo.played == false){
        teamOnePoints = 0
        teamTwoPoints = 0
      }
      else if(teamTwoPlayerOne.played == false || teamTwoPlayerTwo.played == false){
        if (teamOneOverUnder > teamTwoOverUnder){
          teamOnePoints += 0
        } else if (teamOneOverUnder < teamTwoOverUnder) {
          teamTwoPoints += 2
        } else {
          teamOnePoints += 0
          teamTwoPoints += 1
        }
      }
      else {
        if (teamOneOverUnder > teamTwoOverUnder){
        teamOnePoints += 0
      } else if (teamOneOverUnder < teamTwoOverUnder) {
        teamTwoPoints += 4
      } else {
        teamOnePoints += 0
        teamTwoPoints += 2
      }
    }
    } else if(teamTwoPlayerOne.played == false && teamTwoPlayerTwo.played == false){
      if (teamOneOverUnder > teamTwoOverUnder){
        teamOnePoints += 2
      } else if (teamOneOverUnder < teamTwoOverUnder) {
        teamTwoPoints += 0
      } else {
        teamOnePoints += 1
        teamTwoPoints += 0
      }
    }
    else if(teamTwoPlayerOne.played == false || teamTwoPlayerTwo.played == false){
      if (teamOneOverUnder > teamTwoOverUnder){
        teamOnePoints += 2
      } else if (teamOneOverUnder < teamTwoOverUnder) {
        teamTwoPoints += 2
      } else {
        teamOnePoints += 1
        teamTwoPoints += 1
      }
    }
    else{
      if (teamOneOverUnder > teamTwoOverUnder){
        teamOnePoints += 2
      } else if (teamOneOverUnder < teamTwoOverUnder) {
        teamTwoPoints += 4
      } else {
        teamOnePoints += 1
        teamTwoPoints += 2
      }
    }
  } else if (teamOnePlayerTwo.played == false){
    if(teamOnePlayerOne.played == false){
      if (teamTwoPlayerOne.played == false && teamTwoPlayerTwo.played == false){
        teamOnePoints = 0
        teamTwoPoints = 0
      }
      else if(teamTwoPlayerOne.played == false || teamTwoPlayerTwo.played == false){
        if (teamOneOverUnder > teamTwoOverUnder){
          teamOnePoints += 0
        } else if (teamOneOverUnder < teamTwoOverUnder) {
          teamTwoPoints += 2
        } else {
          teamOnePoints += 0
          teamTwoPoints += 1
        }
      }
      else {
        if (teamOneOverUnder > teamTwoOverUnder){
        teamOnePoints += 0
      } else if (teamOneOverUnder < teamTwoOverUnder) {
        teamTwoPoints += 4
      } else {
        teamOnePoints += 0
        teamTwoPoints += 2
      }
    }
  } else if(teamTwoPlayerOne.played == false && teamTwoPlayerTwo.played == false){
      if (teamOneOverUnder > teamTwoOverUnder){
        teamOnePoints += 2
      } else if (teamOneOverUnder < teamTwoOverUnder) {
        teamTwoPoints += 0
      } else {
        teamOnePoints += 1
        teamTwoPoints += 0
      }
    }
    else if(teamTwoPlayerOne.played == false || teamTwoPlayerTwo.played == false){
      if (teamOneOverUnder > teamTwoOverUnder){
        teamOnePoints += 2
      } else if (teamOneOverUnder < teamTwoOverUnder) {
        teamTwoPoints += 2
      } else {
        teamOnePoints += 1
        teamTwoPoints += 1
      }
    }
    else{
      if (teamOneOverUnder > teamTwoOverUnder){
        teamOnePoints += 2
      } else if (teamOneOverUnder < teamTwoOverUnder) {
        teamTwoPoints += 4
      } else {
        teamOnePoints += 1
        teamTwoPoints += 2
      }
    }
  } else if (teamTwoPlayerOne.played == false){
    if(teamTwoPlayerTwo.played == false){
      if (teamOnePlayerOne.played == false && teamOnePlayerTwo.played == false){
        teamOnePoints = 0
        teamTwoPoints = 0
      }
      else if(teamOnePlayerOne.played == false || teamOnePlayerTwo.played == false){
        if (teamOneOverUnder > teamTwoOverUnder){
          teamOnePoints += 2
        } else if (teamOneOverUnder < teamTwoOverUnder) {
          teamTwoPoints += 0
        } else {
          teamOnePoints += 1
          teamTwoPoints += 0
        }
      }
      else {
        if (teamOneOverUnder > teamTwoOverUnder){
        teamOnePoints += 4
      } else if (teamOneOverUnder < teamTwoOverUnder) {
        teamTwoPoints += 0
      } else {
        teamOnePoints += 2
        teamTwoPoints += 0
      }
    }
  } else if(teamOnePlayerOne.played == false && teamOnePlayerTwo.played == false){
      if (teamOneOverUnder > teamTwoOverUnder){
        teamOnePoints += 0
      } else if (teamOneOverUnder < teamTwoOverUnder) {
        teamTwoPoints += 2
      } else {
        teamOnePoints += 1
        teamTwoPoints += 0
      }
    }
    else if(teamOnePlayerOne.played == false || teamOnePlayerTwo.played == false){
      if (teamOneOverUnder > teamTwoOverUnder){
        teamOnePoints += 2
      } else if (teamOneOverUnder < teamTwoOverUnder) {
        teamTwoPoints += 2
      } else {
        teamOnePoints += 1
        teamTwoPoints += 1
      }
    }
    else{
      if (teamOneOverUnder > teamTwoOverUnder){
        teamOnePoints += 4
      } else if (teamOneOverUnder < teamTwoOverUnder) {
        teamTwoPoints += 2
      } else {
        teamOnePoints += 2
        teamTwoPoints += 1
      }
    }
  }
  else if (teamTwoPlayerTwo.played == false){
    if(teamTwoPlayerOne.played == false){
      if (teamOnePlayerOne.played == false && teamOnePlayerTwo.played == false){
        teamOnePoints = 0
        teamTwoPoints = 0
      }
      else if(teamOnePlayerOne.played == false || teamOnePlayerTwo.played == false){
        if (teamOneOverUnder > teamTwoOverUnder){
          teamOnePoints += 2
        } else if (teamOneOverUnder < teamTwoOverUnder) {
          teamTwoPoints += 0
        } else {
          teamOnePoints += 1
          teamTwoPoints += 0
        }
      }
      else {
        if(teamOneOverUnder > teamTwoOverUnder){
        teamOnePoints += 4
      } else if (teamOneOverUnder < teamTwoOverUnder) {
        teamTwoPoints += 0
      } else {
        teamOnePoints += 2
        teamTwoPoints += 0
      }
      }
    } else if(teamOnePlayerOne.played == false && teamOnePlayerTwo.played == false){
      if (teamOneOverUnder > teamTwoOverUnder){
        teamOnePoints += 0
      } else if (teamOneOverUnder < teamTwoOverUnder) {
        teamTwoPoints += 2
      } else {
        teamOnePoints += 1
        teamTwoPoints += 0
      }
    }
    else if(teamOnePlayerOne.played == false || teamOnePlayerTwo.played == false){
      if (teamOneOverUnder > teamTwoOverUnder){
        teamOnePoints += 2
      } else if (teamOneOverUnder < teamTwoOverUnder) {
        teamTwoPoints += 2
      } else {
        teamOnePoints += 1
        teamTwoPoints += 1
      }
    }
    else{
      if (teamOneOverUnder > teamTwoOverUnder){
        teamOnePoints += 4
      } else if (teamOneOverUnder < teamTwoOverUnder) {
        teamTwoPoints += 2
      } else {
        teamOnePoints += 2
        teamTwoPoints += 1
      }
    }
  }
  else {
    if (teamOneOverUnder > teamTwoOverUnder){
      teamOnePoints += 4
    } else if (teamOneOverUnder < teamTwoOverUnder) {
      teamTwoPoints += 4
    } else {
      teamOnePoints += 2
      teamTwoPoints += 2
    }
  }
}

module.exports = router
