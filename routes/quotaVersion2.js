const express = require('express')
const bodyParser = require('body-parser')
const pgp = require('pg-promise')()
const router = express.Router()
const bcrypt = require('bcrypt')
const saltRounds = 10
router.use(bodyParser.urlencoded({ extended: false }))


router.get("/quotas",(req,res)=>{
    db.any("select to_char(AVG (p_score),'99999999999999999D99') AS average_score, p_name, COUNT (p_score) from PUBLIC.golf_score where p_score !=0 group by p_name HAVING COUNT (p_score) > 10 order by p_name desc;")
    .then((quotas)=>{
        //console.log(quotas)
        for(i=0 ;i<quotas.length;i++){
            let quota=quotas[i]
            console.log(quota)
            let quotapush = {name:quota.p_name,quota:quota.average_score,newbie:quota.count}
            console.log(quotapush)
            thisWeeksQuotas.push(quotapush)
        }
        
    })
    console.log("test")
    res.send("Working on Quotas")

})



module.exports = router