const express = require('express')
const bodyParser = require('body-parser')
const pgp = require('pg-promise')()
const router = express.Router()
const bcrypt = require('bcrypt')
const saltRounds = 10
router.use(bodyParser.urlencoded({ extended: false }))

let teams =[]
let teamPlayer1="steve"
let teamPlayer2="player6"
let APlayer=""
let BPlayer=""
let ABPlayers=[]


//looping through the teams to create teamPlayer1 and 2
function getTeams(){
    db.any('SELECT team,player1,player2 FROM teams')
    .then((teams)=>{
        
        
            console.log(teams)

        })
        
    
}


router.get('/scoring',(req,res)=>{
    getTeams()
    
    res.send("got the teams")
    })
//checks to see who is A player or B Player
function ABPlayer(teamPlayer1,teamPlayer2){

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

   let ABPlayersPush = {APlayer:APlayer, APlayerQuota:APlayerQuota,BPlayer:BPlayer,BPlayerQuota:BPlayerQuota}
   ABPlayers.push(ABPlayersPush)
   
    //console.log(APlayer)
    //console.log(BPlayer)
    //console.log(ABPlayers)

    }

router.get('/next-weeks-matches',(req,res)=>{
    //some hardcodinq untill the teams are set
       ABPlayer(teamPlayer1,teamPlayer2)

    res.render('next-weeks-matches',{ABPlayers:ABPlayers})
})





module.exports = router