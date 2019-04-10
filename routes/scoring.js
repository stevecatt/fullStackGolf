const express = require('express')
const bodyParser = require('body-parser')
const pgp = require('pg-promise')()
const router = express.Router()
const bcrypt = require('bcrypt')
const saltRounds = 10
router.use(bodyParser.urlencoded({ extended: false }))



let APlayer=""
let BPlayer=""



//looping through the teams to create teamPlayer1 and 2
function getTeams(){
    db.any('SELECT team,player1,player2 FROM teams')
    .then((teams)=>{
        console.log('this is teams list')
        console.log(teams)
        for (i=0; i < teams.length; i++){
            let team = teams[i].team
            let teamPlayer1 =teams[i].player1
            let teamPlayer2 = teams[i].player2
            ABPlayer(team,teamPlayer1,teamPlayer2)

        }
        
           

        })
        
    
}



//checks to see who is A player or B Player
function ABPlayer(team,teamPlayer1,teamPlayer2){

    let teamNumber=team
    let thisweekplayer1 = thisWeeksQuotas.filter(quota=>quota.name==teamPlayer1)
    let thisweekplayer2 = thisWeeksQuotas.filter(quota=>quota.name==teamPlayer2)
   
    if(thisweekplayer1[0].quota >= thisweekplayer2[0].quota){
         APlayer= teamPlayer1
         BPlayer= teamPlayer2
         APlayerQuota=thisweekplayer1[0].quota
         BPlayerQuota=thisweekplayer2[0].quota
        

    }else{
         APlayer=teamPlayer2
         BPlayer=teamPlayer1
         APlayerQuota=thisweekplayer2[0].quota
         BPlayerQuota=thisweekplayer1[0].quota
       
    }

   let ABPlayersPush = {teamNumber:teamNumber,APlayer:APlayer, APlayerQuota:APlayerQuota,BPlayer:BPlayer,BPlayerQuota:BPlayerQuota}
   ABPlayers.push(ABPlayersPush)
   
    
    }

router.get('/next-weeks-matches',(req,res)=>{
    
    getTeams()

    

    res.render('next-weeks-matches',{ABPlayers:ABPlayers})

})

// use this to prepopulate the scoring input not yet

/*
router.get('/input-scores',(res,req)=>{
    getteams()
    res.render('input-scores',{ABPlayers:ABPlayers})
})
*/

module.exports = router