const express = require('express')
const bodyParser = require('body-parser')
const pgp = require('pg-promise')()
const router = express.Router()

router.use(bodyParser.urlencoded({ extended: false }))

router.get('/input-scores', (req, res) => {
  res.render('input-scores')
})

router.post('/add-player', (req, res) => {
  let playerName = req.body.playerName
  let score = parseInt(req.body.score)
  console.log(playerName)

  db.any('SELECT golfer FROM "Quotas" WHERE golfer=$1',[playerName])
  .then((player)=>{
   if(player){
     console.log(player)
     db.one('SELECT q1,q2,q3,q4,q5,q6,q7,q8,q9,q10,q11 FROM "Quotas" WHERE golfer = $1', [player])
.then ((quota)=>{
  let updatedQuotaList = Object.values(quota)
  
  
  updatedQuotaList.unshift(score)
  
  updatedQuotaList.pop()
  updatedQuotaList.push(player)
  db.none('UPDATE "Quotas" SET q1=$1,q2=$2,q3=$3,q4=$4,q5=$5,q6=$6,q7=$7,q8=$8,q9=$9,q10=$10,q11=$11 WHERE golfer=$12',updatedQuotaList)

  
  
  

})

   }
  })
})
/*

  db.one('INSERT INTO "Quotas"(golfer, q1) VALUES($1, $2) RETURNING id', [playerName, score])
  .then((data) => {
    console.log(data)
    console.log("SUCCESS")
  }).catch(error => console.log(error))
  res.render('input-scores', {message: "The player's score has been added."})
 })
*/
module.exports = router
