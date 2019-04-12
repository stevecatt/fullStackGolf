const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({ extended: false }))

router.get('/leaderboard', (req, res) => {
  db.any('SELECT team, player_one, player_two, points FROM teams ORDER BY points desc;')
  .then((teams) => {
    let displayTeams = []
    for (let i = 0; i < teams.length; i++) {
      displayTeams.push({
        rank: i+1,
        team: teams[i].team,
        player_one: teams[i].player_one,
        player_two: teams[i].player_two,
        points: teams[i].points
      })
    }

    res.render('leaderboard', {teams: displayTeams})
  })
})

module.exports = router
