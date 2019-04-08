const express = require('express')
const router = express.Router()

let admins

router.get('/admin/login', (req,res) => {
  res.render('admin-test')
})

router.post('/admin/login', (req,res) => {

  res.redirect('/quotas')
})

module.exports = router
