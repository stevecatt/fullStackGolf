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
    let week = parseInt(req.body.week)
    console.log(teamNumber)
    console.log(password)
    db.one('SELECT team,hash, player1,player2 FROM teams WHERE team = $1',[teamNumber])
    .then((hash)=>{
        console.log(hash)
        bcrypt.compare(password,hash.hash,function(err,result){
            if (result==true){
                console.log("success")
                //going to add a query to schedule by week to find players
                let team1Player1=hash.player1
                let team1Player2=hash.player2
                let team1number=hash.team
                //this is hardcode for now
                let team2Number=30
                let team2Player1="billy"
                let team2Player2="bob"

                let teams = {week:week,team1Number:team1number,team1Player1:team1Player1, team1Player2:team1Player2,team2Number:team2Number,team2Player1:team2Player1,team2Player2:team2Player2}
                
                res.render('input-scores',teams)
                
            }else{
                console.log("wrong Password")
                res.render('sign-in-team',{message:"Incorrect Password"})
               
            }
        })
    })

    
})









module.exports = router