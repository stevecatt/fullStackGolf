const express = require('express')
const bodyParser = require('body-parser')
const pgp = require('pg-promise')()
const router = express.Router()

router.use(bodyParser.urlencoded({ extended: false }))

//gets the scores from database and calculates quotas based on league rules
function calculateQuotas(){
  db.any('SELECT * FROM "Quotas"')
  .then ((quotas)=>{
  //console.log(quotas)
    for(index=0;index<quotas.length;index++){
    let quota=quotas[index]

      console.log(quota)
      if(quota.q1==null){
        let thisWeekQuota=5
        let quotapush = {name:quota.golfer,quota:thisWeekQuota,newbie:"*"}
        thisWeeksQuotas.push(quotapush)

      console.log(thisWeekQuota)
        console.log(quota.golfer)
    }
      else if(quota.q2==null){
        let thisWeekQuota=quota.q1+3
      let quotapush = {name:quota.golfer,quota:thisWeekQuota,newbie:"*"}
      thisWeeksQuotas.push(quotapush)
      console.log(thisWeekQuota)
    }
    else if(quota.q3==null){
      if(quota.q1>=quota.q2){
        let thisWeekQuota=quota.q1
        let quotapush = {name:quota.golfer,quota:thisWeekQuota,newbie:"*"}
      thisWeeksQuotas.push(quotapush)
        console.log(thisWeekQuota)
      }
      else(thisWeekQuota=quota.q2)
      let quotapush = {name:quota.golfer,quota:thisWeekQuota,newbie:"*"}
      thisWeeksQuotas.push(quotapush)
      console.log(thisWeekQuota)
    }
    else if(quota.q4==null){
      let thisWeekQuota=Math.round((quota.q1+quota.q2+quota.q3)/3)
      let quotapush = {name:quota.golfer,quota:thisWeekQuota,newbie:"*"}
      thisWeeksQuotas.push(quotapush)
      console.log(thisWeekQuota)

    }
    else if(quota.q5==null){
      let thisWeekQuota=Math.round((quota.q1+quota.q2+quota.q3+quota.q4)/4)
      let quotapush = {name:quota.golfer,quota:thisWeekQuota,newbie:"*"}
      thisWeeksQuotas.push(quotapush)
      console.log(thisWeekQuota)
    }
    else if(quota.q6==null){
      let thisWeekQuota=Math.round((quota.q1+quota.q2+quota.q3+quota.q4+quota.q5)/5)
      let quotapush = {name:quota.golfer,quota:thisWeekQuota,newbie:"*"}
      thisWeeksQuotas.push(quotapush)
      console.log(thisWeekQuota)
    }
    else if(quota.q7==null){
      let thisWeekQuota=Math.round((quota.q1+quota.q2+quota.q3+quota.q4+quota.q5+quota.q6)/6) 
      let quotapush = {name:quota.golfer,quota:thisWeekQuota,newbie:"*"}
      thisWeeksQuotas.push(quotapush)
      console.log(thisWeekQuota)
    }
    else if(quota.q8==null){
      let thisWeekQuota=Math.round((quota.q1+quota.q2+quota.q3+quota.q4+quota.q5+quota.q6+quota.q7)/7)
      let quotapush = {name:quota.golfer,quota:thisWeekQuota,newbie:"*"}
      thisWeeksQuotas.push(quotapush)
      console.log(thisWeekQuota)
    }
    else if(quota.q9==null){
      let thisWeekQuota=Math.round((quota.q1+quota.q2+quota.q3+quota.q4+quota.q5+quota.q6+quota.q7+quota.q8)/8 )
      let quotapush = {name:quota.golfer,quota:thisWeekQuota,newbie:"*"}
      thisWeeksQuotas.push(quotapush)
      console.log(thisWeekQuota)
    }
    else if(quota.q10==null){
      let thisWeekQuota=Math.round((quota.q1+quota.q2+quota.q3+quota.q4+quota.q5+quota.q6+quota.q7+quota.q8+quota.q9)/9 )
      let quotapush = {name:quota.golfer,quota:thisWeekQuota,newbie:"*"}
      thisWeeksQuotas.push(quotapush)
      console.log(thisWeekQuota)
    }
    else if(quota.q11==null){
      let thisWeekQuota=Math.round((quota.q1+quota.q2+quota.q3+quota.q4+quota.q5+quota.q6+quota.q7+quota.q8+quota.q9+quota.q10)/10 )
      let quotapush = {name:quota.golfer,quota:thisWeekQuota,newbie:"*"}
      thisWeeksQuotas.push(quotapush)
      console.log(thisWeekQuota)
    }
    else{let thisWeekQuota=Math.round((quota.q1+quota.q2+quota.q3+quota.q4+quota.q5+quota.q6+quota.q7+quota.q8+quota.q9+quota.q10)/10)
      let quotapush = {name:quota.golfer,quota:thisWeekQuota}
      thisWeeksQuotas.push(quotapush)
      console.log(thisWeekQuota)
    }
   // console.log(thisWeekQuota)
  }
 

})
}

thisWeeksQuotas= []
//gets the scores from database and calculates quotas based on league rules
router.get("/quotas",(req,res)=>{
  calculateQuotas()
  res.render('quotas',{thisweek:thisWeeksQuotas})
    
    })



    
    module.exports = router