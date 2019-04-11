const express = require('express')
const bodyParser = require('body-parser')
const pgp = require('pg-promise')()
const router = express.Router()
const bcrypt = require('bcrypt')
const saltRounds = 10
router.use(bodyParser.urlencoded({ extended: false }))


function addScoresToQuota(pid){
    
    
    let score=[]
    db.any("select p_score from PUBLIC.golf_score where p_id =$1 and p_score !=0 order by p_date desc limit 11;",[pid])
    .then((quotas)=>{
        //console.log(quotas)
        for(i=0;i<quotas.length;i++){
            
           let quota=quotas[i]
           score.push(quota.p_score)

    
        }
        if (score.length ==11){
            score.push(pid)
            db.none('UPDATE steveq_test SET q1=$1, q2=$2, q3=$3, q4=$4,q5=$5,q6=$6,q7=$7,q8=$8,q9=$9,q10=$10,q11=$11 WHERE id=$12',score)
        .then(()=>{
        console.log("Hello")
        //res.send("steve's Working")
        })
              console.log(score)
        }else{
            console.log("too few scores")
        //res.send("boo Hoo")

        }
       
        

        

    })
    
   

    
    
    

}

router.get('/steve',(req,res)=>{
    res.render("steve")

})



router.post('/steve',(req,res)=>{
    let pid=parseInt(req.body.num)
    let number=[]
    number=pid+1
    console.log(number)

  addScoresToQuota(pid)
    //addScoresToQuota()
    res.render("steve",{number:number})
})



module.exports = router