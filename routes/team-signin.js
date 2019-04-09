const express = require('express')
const bodyParser = require('body-parser')
const pgp = require('pg-promise')()
const router = express.Router()
const bcrypt = require('bcrypt')
const saltRounds = 10
router.use(bodyParser.urlencoded({ extended: false }))

router.get('/team-sign-in',(req,res)=>{
    res.render('sign-in-team')
})

router.post('/team-sign-in',(req,res)=>{
    let teamNumber=parseInt(req.body.teamNumber)
    let password = req.body.password
    console.log(teamNumber)
    console.log(password)
    db.one('SELECT hash FROM teams WHERE team = $1',[teamNumber])
    .then((hash)=>{
        console.log(hash.hash)
        bcrypt.compare(password,hash.hash,function(err,result){
            if (result==true){
                console.log("success")
                res.redirect('/input-scores')
                
            }else{
                console.log("wrong Password")
                res.render('sign-in-team',{message:"Incorrect Password"})
               
            }
        })
    })

    
})









module.exports = router