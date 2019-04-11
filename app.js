const express = require('express')
const models = require('./models')
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const pgp = require('pg-promise')()
const adminCredRoutes = require('./routes/admin-credentials')
const inputScoresRoutes = require('./routes/input-scores')
const calculateQuotas = require('./routes/calculate-quotas')
const authenticate = require('./routes/admin-authenticate')
const adminTeams = require('./routes/admin-teams')
const teamSignIn = require('./routes/team-signin')
const archiveRoutes = require('./routes/admin-archive')
const fullSchRoutes = require('./routes/full-schedule')
const scoring = require('./routes/scoring')
const getSchedule = require('./routes/get-schedule')
//const quotaManagement = require('./routes/quotaVersion2')
const stevetest=require('./routes/stevetest')
const scoreLogic = require('./routes/score-logic')
//const quotaManagement = require('./routes/quotaVersion2')



//ABPlayers=[]
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
app.use('/', inputScoresRoutes)
app.use('/',calculateQuotas)
app.use('/',teamSignIn)
app.use('/', archiveRoutes)
app.use('/', fullSchRoutes)
app.use('/',scoring)
app.use('/',getSchedule)
//app.use('/',quotaManagement)
app.use('/',stevetest)
app.use('/', scoreLogic)
//app.use('/',quotaManagement)

app.use(bodyParser.urlencoded({ extended: false }))
app.engine('mustache',mustacheExpress(VIEWS_PATH + '/partials', '.mustache'))
app.set('views','./views')
app.set('view engine','mustache')




//render mustache pages

app.get('/last-weeks-scores', (req, res) => {
  res.render('last-weeks-scores')
})

app.get('/next-weeks-matches', (req, res) => {
  res.render('next-weeks-matches')
})

app.get('/view-player-quotas', (req, res) => {
  res.render('view-player-quotas')
})

app.get('/leaderboard', (req, res) => {
  res.render('leaderboard')
})


app.listen(3000,function(){
  console.log("node server has started")
})
