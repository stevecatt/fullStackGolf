const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const saltRounds = 10
const pgp = require('pg-promise')()


let session = require('express-session')

router.use(session({
  secret: 'Quoth the raven, beware, for twas brillig',
  resave: false,
  saveUninitialized: true
}))
router.use(bodyParser.urlencoded({ extended: false }))

router.get('/admin-login', (req,res) => {
  if (req.session) {
    if(req.session.adminUsername) {
      res.redirect('/admin/dashboard')
    } else {
      res.render('admin-login')
    }
  } else {
    res.render('admin-login')
  }
})

router.post('/admin-login', (req,response) => {
  let username = req.body.username
  db.one('SELECT username, hash FROM admins WHERE username = $1', [username])
  .then((admin) => {
    bcrypt.compare(req.body.password, admin.hash, function(err, res) {
      if (res) {
        if(req.session) {
          req.session.adminUsername = username
          response.redirect('/admin/dashboard')
        } else {
          console.log('unexpected error...')
        }
      } else {
        console.log('Invalid credentials. Error: ' + err)
        response.render('admin-login', {message2: "Invalid credentials. Please Try Again."})
      }
    })
  })
})

router.get('/admin/register', (req, res) => {
  res.render('admin-register')
})

router.post('/admin/register', (req,res) => {
  let username = req.body.username
  let name = req.body.name
  let hash = bcrypt.hashSync(req.body.password, saltRounds)
  db.one('SELECT EXISTS(SELECT username FROM admins WHERE username = $1);', [username]).then((admin) => {
    if (admin.exists) {
      res.render('admin-register', {message: 'Admin already registered! Please enter new username.'})
    } else {
      db.none('INSERT INTO admins(username, hash, name) VALUES($1,$2,$3);', [username, hash, name])
      res.render('admin-dashboard', {message: "New Admin Account Registered."})
    }
  })
})

router.get('/admin/dashboard', (req,res) => {
  res.render('admin-dashboard')
})

router.post('/admin/signout', (req,res) => {
  if (req.session) {
    req.session.destroy(() => {
      res.redirect('/admin-login')
    })
  } else {
    res.redirect('/admin/dashboard')
  }
})

module.exports = router
