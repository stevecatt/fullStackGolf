const express = require('express')
const bodyParser = require('body-parser')
const pgp = require('pg-promise')()
const router = express.Router()
const bcrypt = require('bcrypt')
const saltRounds = 10
router.use(bodyParser.urlencoded({ extended: false }))



let APlayer=""
let BPlayer=""

//scoring to database
function inputScores(playerName,score){

    db.any('SELECT golfer FROM "steveq_test" WHERE golfer=$1',[playerName])
    .then((player)=>{
     if(player!=""){
       console.log(player)
       db.one('SELECT q1,q2,q3,q4,q5,q6,q7,q8,q9,q10,q11 FROM "steveq_test" WHERE golfer = $1', [playerName])
    .then ((quota)=>{
        console.log(quota)
        let updatedQuotaList = Object.values(quota)
        updatedQuotaList.unshift(score)
        updatedQuotaList.pop()
        updatedQuotaList.push(playerName)
        console.log(updatedQuotaList)
        db.none('UPDATE "steveq_test" SET q1=$1,q2=$2,q3=$3,q4=$4,q5=$5,q6=$6,q7=$7,q8=$8,q9=$9,q10=$10,q11=$11 WHERE golfer=$12',updatedQuotaList)
    .then(()=>{
      console.log("Hello")
    })
  
        }).catch(error => console.log(error))
      }
      else{
         db.one('INSERT INTO "steveq_test"(golfer, q1) VALUES($1, $2) RETURNING id', [playerName, score])
          .then((data) => {
        console.log(data)
        console.log("SUCCESS")
  
    }).catch(error => console.log(error))
  
  
  
      }
    })
  }



//calculate quotas
function calculateQuotas(){
    db.any('SELECT * FROM "steveq_test"')
    .then ((quotas)=>{
    //console.log(quotas)
      for(index=0;index<quotas.length;index++){
      let quota=quotas[index]
  
        //console.log(quota)
        if(quota.q1==null){
          let thisWeekQuota=5
          let quotapush = {name:quota.golfer,quota:thisWeekQuota,newbie:"*"}
          thisWeeksQuotas.push(quotapush)
  
        //console.log(thisWeekQuota)
          //console.log(quota.golfer)
      }
        else if(quota.q2==null){
          let thisWeekQuota=quota.q1+3
        let quotapush = {name:quota.golfer,quota:thisWeekQuota,newbie:"*"}
        thisWeeksQuotas.push(quotapush)
        //console.log(thisWeekQuota)
      }
      else if(quota.q3==null){
        if(quota.q1>=quota.q2){
          let thisWeekQuota=quota.q1
          let quotapush = {name:quota.golfer,quota:thisWeekQuota,newbie:"*"}
        thisWeeksQuotas.push(quotapush)
          //console.log(thisWeekQuota)
        }
        else{thisWeekQuota=quota.q2
        let quotapush = {name:quota.golfer,quota:thisWeekQuota,newbie:"*"}
        thisWeeksQuotas.push(quotapush)
        //console.log(thisWeekQuota)
      }
    }
      else if(quota.q4==null){
        let thisWeekQuota=Math.round((quota.q1+quota.q2+quota.q3)/3)
        let quotapush = {name:quota.golfer,quota:thisWeekQuota,newbie:"*"}
        thisWeeksQuotas.push(quotapush)
        //console.log(thisWeekQuota)
  
      }
      else if(quota.q5==null){
        let thisWeekQuota=Math.round((quota.q1+quota.q2+quota.q3+quota.q4)/4)
        let quotapush = {name:quota.golfer,quota:thisWeekQuota,newbie:"*"}
        thisWeeksQuotas.push(quotapush)
        //console.log(thisWeekQuota)
      }
      else if(quota.q6==null){
        let thisWeekQuota=Math.round((quota.q1+quota.q2+quota.q3+quota.q4+quota.q5)/5)
        let quotapush = {name:quota.golfer,quota:thisWeekQuota,newbie:"*"}
        thisWeeksQuotas.push(quotapush)
        //console.log(thisWeekQuota)
      }
      else if(quota.q7==null){
        let thisWeekQuota=Math.round((quota.q1+quota.q2+quota.q3+quota.q4+quota.q5+quota.q6)/6) 
        let quotapush = {name:quota.golfer,quota:thisWeekQuota,newbie:"*"}
        thisWeeksQuotas.push(quotapush)
        //console.log(thisWeekQuota)
      }
      else if(quota.q8==null){
        let thisWeekQuota=Math.round((quota.q1+quota.q2+quota.q3+quota.q4+quota.q5+quota.q6+quota.q7)/7)
        let quotapush = {name:quota.golfer,quota:thisWeekQuota,newbie:"*"}
        thisWeeksQuotas.push(quotapush)
        //console.log(thisWeekQuota)
      }
      else if(quota.q9==null){
        let thisWeekQuota=Math.round((quota.q1+quota.q2+quota.q3+quota.q4+quota.q5+quota.q6+quota.q7+quota.q8)/8 )
        let quotapush = {name:quota.golfer,quota:thisWeekQuota,newbie:"*"}
        thisWeeksQuotas.push(quotapush)
        //console.log(thisWeekQuota)
      }
      else if(quota.q10==null){
        let thisWeekQuota=Math.round((quota.q1+quota.q2+quota.q3+quota.q4+quota.q5+quota.q6+quota.q7+quota.q8+quota.q9)/9 )
        let quotapush = {name:quota.golfer,quota:thisWeekQuota,newbie:"*"}
        thisWeeksQuotas.push(quotapush)
        //console.log(thisWeekQuota)
      }
      else if(quota.q11==null){
        let thisWeekQuota=Math.round((quota.q1+quota.q2+quota.q3+quota.q4+quota.q5+quota.q6+quota.q7+quota.q8+quota.q9+quota.q10)/10 )
        let quotapush = {name:quota.golfer,quota:thisWeekQuota,newbie:"*"}
        thisWeeksQuotas.push(quotapush)
        //console.log(thisWeekQuota)
      }
      else{let thisWeekQuota=Math.round((quota.q1+quota.q2+quota.q3+quota.q4+quota.q5+quota.q6+quota.q7+quota.q8+quota.q9+quota.q10)/10)
        let quotapush = {name:quota.golfer,quota:thisWeekQuota}
        thisWeeksQuotas.push(quotapush)
        //console.log(thisWeekQuota)
      }
      //console.log(thisWeekQuota)
    }
   
  
  })
  }

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
    
    calculateQuotas()

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
    
    inputScores(APlayer,APlayerScore)
    inputScores(BPlayer,BPlayerScore)

    db.one('SELECT team,player_one,player_two FROM teams where team = $1',oppTeamNumber)
     .then((teams)=>{
        console.log(getTeams)
        
       
        let team = teams.team
        let teamPlayer1 =teams.player_one
        let teamPlayer2 = teams.player_two
           
             
        ABPlayer(team,teamPlayer1,teamPlayer2)
        

        // }
            let otherTeam= ABPlayers.filter(team=>team.teamNumber==oppTeamNumber)
            
            res.render('input-second',{otherTeam:otherTeam})

                 })
               

                

               
                
                
                


            })

router.post('/input-second',(req,res)=>{
        let teamNumber=parseInt(req.body.teamNumber)
        let APlayer= req.body.playerName1
        let BPlayer= req.body.playerName2
        let APlayerScore=parseInt(req.body.score1)
        let BPlayerScore=parseInt(req.body.score2)
        inputScores(APlayer,APlayerScore)
        inputScores(BPlayer,BPlayerScore)


        res.send("scores are in")
    })

    // use this to prepopulate the scoring input not yet

/*
router.('/input-scores',(res,req)=>{
    getteams()
    res.render('input-scores',{ABPlayers:ABPlayers})
})
*/


module.exports = router
