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
app.use(bodyParser.urlencoded({ extended: false }))
app.engine('mustache',mustacheExpress(VIEWS_PATH + '/partials', '.mustache'))
app.set('views','./views')
app.set('view engine','mustache')



app.get("/quota",(req,res)=>{
  db.any('SELECT * FROM "Quotas"')
  .then ((quotas)=>{
    res.render('quotas',{quotas:quotas})

  })

})
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



app.get('/input-scores', (req, res) => {
  res.render('input-scores')
})
//test updating scores with hard code
let player='player1'
let score= 55
//pushes work the FIFO paft of Quotas, adding latest score to Q1 removing oldest score fromm Q11
db.one('SELECT q1,q2,q3,q4,q5,q6,q7,q8,q9,q10,q11 FROM "Quotas" WHERE golfer = $1', [player])
.then ((quota)=>{
  let updatedQuotaList = Object.values(quota)

  //console.log(updatedQuotaList)
  updatedQuotaList.unshift(score)
  //console.log(updatedQuotaList)
  updatedQuotaList.pop()
  updatedQuotaList.push(player)
  db.none('UPDATE "Quotas" SET q1=$1,q2=$2,q3=$3,q4=$4,q5=$5,q6=$6,q7=$7,q8=$8,q9=$9,q10=$10,q11=$11 WHERE golfer=$12',updatedQuotaList)



  //console.log(updatedQuotaList[11])

  //console.log(updatedQuotaList)

})

app.listen(3000,function(){
  console.log("node server has started")
})
