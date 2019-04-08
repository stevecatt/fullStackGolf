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


let admins = []

router.get('/admin-login', (req,res) => {
  res.render('admin-test')
})

router.post('/admin-login', (req,response) => {
  let username = req.body.username
  db.one('SELECT username, hash FROM admins WHERE username = $1', [username])
  .then((admin) => {
    console.log(admin.username + "hash: " + admin.hash)
  })
  response.redirect('/admin-login')
  // let persistedAdmin = admins.find((admin) => {
  //   return admin.username = username
  // })
  // bcrypt.compare(req.body.password, persistedAdmin.hash, function(err, res) {
  //   if (res) {
  //     if(req.session) {
  //       req.session.username = username
  //       console.log(admins)
  //       response.redirect('/leaderboard')
  //     } else {
  //       console.log('unexpected error...')
  //     }
  //   } else {
  //     console.log('Invalid credentials. Error: ' + err)
  //   }
  // })
})

router.get('/admin/register', (req, res) => {
  res.render('admin-register')
})

router.post('/admin-register', (req,res) => {
  let username = req.body.username
  let hash = bcrypt.hashSync(req.body.password, saltRounds)
  db.none('INSERT INTO admins(username, hash) VALUES($1,$2);', [username, hash])
  let admin = {username:username, hash:hash}
  admins.push(admin)
  res.redirect('/admin-login')
})

module.exports = router
