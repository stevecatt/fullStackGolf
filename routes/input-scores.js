const express = require('express')
const bodyParser = require('body-parser')
const pgp = require('pg-promise')()
const router = express.Router()

router.use(bodyParser.urlencoded({ extended: false }))

router.get('/input-scores', (req, res) => {
  res.render('input-scores')
})

 async function inputScores(playerName,score){

  db.any('SELECT golfer FROM "Quotas" WHERE golfer=$1',[playerName])
  .then((player)=>{
   if(player!=""){
     console.log(player)
     db.one('SELECT q1,q2,q3,q4,q5,q6,q7,q8,q9,q10,q11 FROM "Quotas" WHERE golfer = $1', [playerName])
  .then ((quota)=>{
      console.log(quota)
      let updatedQuotaList = Object.values(quota)
      updatedQuotaList.unshift(score)

      updatedQuotaList.pop()
      updatedQuotaList.push(playerName)
      console.log(updatedQuotaList)
      db.none('UPDATE "Quotas" SET q1=$1,q2=$2,q3=$3,q4=$4,q5=$5,q6=$6,q7=$7,q8=$8,q9=$9,q10=$10,q11=$11 WHERE golfer=$12',updatedQuotaList)
  .then(()=>{
    console.log("Hello")
  })
 
      }).catch(error => console.log(error))
    }
    else{
       db.one('INSERT INTO "Quotas"(golfer, q1) VALUES($1, $2) RETURNING id', [playerName, score])
        .then((data) => {
      console.log(data)
      console.log("SUCCESS")
     
  }).catch(error => console.log(error))
  


    }
  })
}

//checks golfer is new or in database and adds current score to quotas
router.post('/input-score', (req, res) => {
  let playerName1 = req.body.playerName1
  let score1 = parseInt(req.body.score1)
  let playerName2 = req.body.playerName2
  let score2 = parseInt(req.body.score2)
  let playerName3 = req.body.playerName3
  let score3 = parseInt(req.body.score3)
  let playerName4 = req.body.playerName4
  let score4 = parseInt(req.body.score4)

 
 


async function f(){
  await inputScores(playerName1,score1)
  await inputScores(playerName2,score2)
  await inputScores(playerName3,score3)
  await inputScores(playerName4,score4)
  
}

  
 f()




  res.render('input-scores', {message: "The players scores have been added."})
})


 

module.exports = router
