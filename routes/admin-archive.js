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
router.post('/admin/archive-teams', (req,res) => {
  let year = new Date().getFullYear().toString()
  let archivedTeams = year + "-archived-teams"
  db.none('SELECT * INTO $1 FROM teams;', [archivedTeams])
  .then(() => {
    res.render('admin-archive', {message: "Successfully archived Current Season's teams"})
  })
})


module.exports = router
