const express = require('express')
const router = express.Router()
const pgp = require('pg-promise')()
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: false }))

router.get('/full-schedule', (req,res) => {
  res.render('full-schedule')
})

router.post('/full-schedule', (req, res) => {
let week = parseInt(req.body.week)
console.log(req.body.week)
console.log(week)

db.any('select match_one, match_two, match_three, match_four, match_five, match_six, match_seven, match_eight, match_nine, match_ten, match_eleven, match_twelve, match_thirteen, match_fourteen, match_fifteen from schedule where week = $1' ,[week])
.then((matches) => {
  if (week > 23){
    res.render('full-schedule',{message9: 'Selected week is out of range: (week < 24)'})
  } else{
    res.render('full-schedule', {match:matches,week:week})
  }
})
.catch((error) => {console.log("error in /full-schedule")})
})


module.exports = router
