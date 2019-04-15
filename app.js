const express = require('express')
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const pgp = require('pg-promise')()
const adminCredRoutes = require('./routes/admin-credentials')
const authenticate = require('./routes/admin-authenticate')
const adminTeams = require('./routes/admin-teams')
const archiveRoutes = require('./routes/admin-archive')
const fullSchRoutes = require('./routes/full-schedule')
const scoring = require('./routes/scoring')
const getSchedule = require('./routes/get-schedule')
const stevetest=require('./routes/stevetest')
const scoreLogic = require('./routes/score-logic')
const leaderboardRoutes = require('./routes/leaderboard')
const PORT = process.env.PORT || 8080


thisWeeksQuotas= []

connectionString = {
  "host": "isilo.db.elephantsql.com",
  "port": 5432,
  "database": "awfaxvvb",
  "user": "awfaxvvb",
  "password":"7xy3FG5wa6SjbIthlLs90vKIieG03pVG"

}

db = pgp(connectionString)
let session = require('express-session')
app.use(session({
  secret: 'Quoth the raven, beware, for twas brillig',
  resave: false,
  saveUninitialized: true
}))

const VIEWS_PATH = path.join(__dirname, '/views')

app.all('/admin/*', authenticate)
app.use('/', adminCredRoutes)
app.use('/', adminTeams)
app.use('/', archiveRoutes)
app.use('/', fullSchRoutes)
app.use('/',scoring)
app.use('/',getSchedule)
app.use('/',stevetest)
app.use('/', scoreLogic)

app.use('/', leaderboardRoutes)

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: false }))
app.engine('mustache',mustacheExpress(VIEWS_PATH + '/partials', '.mustache'))
app.set('views','./views')
app.set('view engine','mustache')


//render mustache pages

app.get('/', (req,res) => {
  res.redirect('/home')
})

app.get('/home', (req, res) => {
  res.render('home')
})

app.get('/next-weeks-matches', (req, res) => {
  res.render('next-weeks-matches')
})

app.get('/hello', (req,res) => {
  res.send('heroku works')
})

app.listen(PORT,function(){
  console.log("node server has started")
})
