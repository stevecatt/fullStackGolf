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
    db.any('SELECT team,player_one,player_two FROM teams')
    .then((teams)=>{
        // console.log('this is teams list')
        // console.log(teams)
        for (i=0; i < teams.length; i++){
            let team = teams[i].team
            let teamPlayer1 =teams[i].player_one
            let teamPlayer2 = teams[i].player_two
            // console.log("this from getteams")
            // console.log(teamPlayer1)
            // console.log(teamPlayer2)
            console.log("in for loop of getTeams()")
            ABPlayer(team,teamPlayer1,teamPlayer2)

        }
        
        })
        
    
}

let ABPlayers=[]

//checks to see who is A player or B Player
function ABPlayer(team,teamPlayer1,teamPlayer2){
    console.log("pushing to array")
    let teamNumber=team
    let thisweekplayer1 = thisWeeksQuotas.filter(quota=>quota.name==teamPlayer1)
    let thisweekplayer2 = thisWeeksQuotas.filter(quota=>quota.name==teamPlayer2)
   
    if(thisweekplayer1[0].quota >= thisweekplayer2[0].quota){
         APlayer= teamPlayer1
         BPlayer= teamPlayer2
         APlayerQuota=thisweekplayer1[0].quota
         BPlayerQuota=thisweekplayer2[0].quota
        // console.log("this is first case")
        //  console.log(APlayerQuota)
        // console.log(BPlayerQuota)

    }else{
         APlayer=teamPlayer2
         BPlayer=teamPlayer1
         APlayerQuota=thisweekplayer2[0].quota
         BPlayerQuota=thisweekplayer1[0].quota
        //  console.log("this is second case")
        //  console.log(APlayerQuota)
        // console.log(BPlayerQuota)
       
    }

   let ABPlayersPush = {teamNumber:teamNumber,APlayer:APlayer, APlayerQuota:APlayerQuota,BPlayer:BPlayer,BPlayerQuota:BPlayerQuota}
   ABPlayers.push(ABPlayersPush)
   
    
}

router.get('/next-weeks-matches',(req,res)=>{
    
    getTeams()
    //console.log(ABPlayers)
    
       // console.log(x)
    

    

    res.render('next-weeks-matches',{ABPlayers:ABPlayers})

})

router.post('/team-sign-in',(req,res)=>{
    
    let teamNumber=parseInt(req.body.teamNumber)
    let password = req.body.password
    let week = parseInt(req.body.week)
    console.log(teamNumber)
    console.log(password)
    
    //getTeams()

    db.one('SELECT team,hash, player_one, player_two FROM teams WHERE team = $1',[teamNumber])
    .then((hash)=>{
        console.log(hash)
        bcrypt.compare(password,hash.hash,function(err,result){
            if (result==true){
                console.log("success")
                let team = hash.team
                let teamPlayer1 =hash.player_one
                let teamPlayer2 = hash.player_two
            console.log("this from gettneweams")
                 console.log(teamPlayer1)
                 console.log(teamPlayer2)
             
                ABPlayer(team,teamPlayer1,teamPlayer2)

                let thisTeam= ABPlayers.filter(team=>team.teamNumber==teamNumber)

                console.log("this is this team")
                console.log(thisTeam)
                
                res.render('input-scores',{thisTeam:thisTeam})
                
            }else{
                console.log("wrong Password")
                res.render('sign-in-team',{message:"Incorrect Password"})
               
            }
        })
    })

    
})


router.post('/input-score',(req,res)=>{
                
    let oppTeamNumber=parseInt(req.body.opposition)
    let teamNumber=parseInt(req.body.teamNumber)
    let APlayer= req.body.playerName1
    let BPlayer= req.body.playerName2
    let APlayerScore=parseInt(req.body.score1)
    let BPlayerScore=parseInt(req.body.score2)

    db.one('SELECT team,player_one,player_two FROM teams where team = $1',oppTeamNumber)
     .then((teams)=>{
        console.log(getTeams)
        
        // for (i=0; i < teams.length; i++){
        let team = teams.team
        let teamPlayer1 =teams.player_one
        let teamPlayer2 = teams.player_two
            // console.log("this from getteams")
         //console.log(teamPlayer1)
         //console.log(teamPlayer2)
             
        ABPlayer(team,teamPlayer1,teamPlayer2)
        // console.log(ABPlayers)

        // }
            let otherTeam= ABPlayers.filter(team=>team.teamNumber==oppTeamNumber)
            console.log("this is otherTeam")
            console.log(otherTeam)
            res.render('input-second',{otherTeam:otherTeam})

                 })
               

                

               
                
                
                


            })

router.post('/input-second',(req,res)=>{
        let teamNumber=parseInt(req.body.teamNumber)
        let APlayer= req.body.playerName1
        let BPlayer= req.body.playerName2
        let APlayerScore=parseInt(req.body.score1)
        let BPlayerScore=parseInt(req.body.score2)


        req.send("scores are in")
    })

    // use this to prepopulate the scoring input not yet

/*
router.('/input-scores',(res,req)=>{
    getteams()
    res.render('input-scores',{ABPlayers:ABPlayers})
})
*/


module.exports = router