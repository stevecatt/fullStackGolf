const express = require('express')
const router = express.Router()
const pgp = require('pg-promise')()

router.get('/full-schedule', (req, res) => {
  res.render('full-schedule')
})
let teams = []
let matches = []

router.post('/generate-schedule', (req,res) => {
    res.redirect('/full-schedule')
})

module.exports = router
