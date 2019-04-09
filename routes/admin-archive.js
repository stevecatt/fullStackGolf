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
router.post('/admin/archive-teams')
db.none('SELECT * INTO $1 FROM teams;', [archiveTeams]).then()

module.exports = router
