const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const saltRounds = 10
const pgp = require('pg-promise')()

router.use(bodyParser.urlencoded({ extended: false }))

router.get('/admin/archive-teams', (req,res) => {
  res.render('admin-archive')
})

let year = new Date().getFullYear().toString()
let archivedTeams = year + "archivedteams"

router.post('/admin/archive-teams', (req,res) => {
  db.none('SELECT * INTO "$1" FROM teams;', [archivedTeams])
  .then(() => {
    db.none('DELETE FROM teams;').then(() => {
      db.none('AlTER SEQUENCE teams_id_seq RESTART WITH 1 OWNED BY teams.id;').then(() => {
        res.render('admin-archive', {message1: "Successfully archived Current Season's teams."})
      })
    })
  })
})

router.post('/admin/undo-archive', (req,res) => {
  db.none('INSERT INTO teams SELECT * FROM "$1";', [archivedTeams])
  .then(() => {
    db.none('DROP TABLE "$1";', [archivedTeams])
    .then(() => {
          res.render('admin-archive', {message2: "Successfully undid archive."})
    })
  })
})


module.exports = router
