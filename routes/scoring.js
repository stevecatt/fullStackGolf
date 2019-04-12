const express = require('express')
const bodyParser = require('body-parser')
const pgp = require('pg-promise')()
const router = express.Router()
const bcrypt = require('bcrypt')
const saltRounds = 10
router.use(bodyParser.urlencoded({ extended: false }))



let APlayer=""
let BPlayer=""
let ABPlayers=[]

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
      //clears the array
      thisWeeksQuotas.length=0
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
    ABPlayers.length=0
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


//this isnt used yet
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
    thisWeeksQuotas.length=0
    calculateQuotas()
    console.log(thisWeeksQuotas)

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
                 ABPlayers.length=0


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

let players =
{
  t1P1: {
    name: "",
    teamNumber: 0,
    quota: 0,
    overUnder: 0,
    played: true
  },
  t1P2: {
    name: "",
    teamNumber: 0,
    quota: 0,
    overUnder: 0,
    played: true
  },
  t2P1: {
    name: "",
    teamNumber: 0,
    quota: 0,
    overUnder: 0,
    played: true
  },
  t2P2: {
    name: "",
    teamNumber: 0,
    quota: 0,
    overUnder: 0,
    played: true
  }
}
let teamOnePoints = 0
let teamTwoPoints = 0
let teamOneOverUnder = 0
let teamTwoOverUnder = 0
//inputs first teams score
router.post('/input-score',(req,res)=>{

    let oppTeamNumber=parseInt(req.body.opposition)
    let teamNumber=parseInt(req.body.teamNumber)
    let APlayer= req.body.playerName1
    let BPlayer= req.body.playerName2
    let APlayerScore=parseInt(req.body.score1)
    let BPlayerScore=parseInt(req.body.score2)
    t1APlayer = players.t1P1
    t1BPlayer = players.t1P2
    t1APlayer.teamNumber = teamNumber
    t1BPlayer.teamNumber = teamNumber
    t1APlayer.name = APlayer
    t1BPlayer.name = BPlayer
    t1APlayer.quota = parseInt(req.body.aPlayerQuota)
    t1BPlayer.quota = parseInt(req.body.bPlayerQuota)
    t1APlayer.played = isNoShow(req.body.onePlayed)
    t1BPlayer.played = isNoShow(req.body.twoPlayed)
    t1APlayer.overUnder = APlayerScore - t1APlayer.quota
    t1BPlayer.overUnder = BPlayerScore - t1BPlayer.quota
    if(isNaN(APlayerScore)){
      console.log("Player One did not enter a score")
    } else{
      inputScores(APlayer,APlayerScore)
    }
    if(isNaN(BPlayerScore)){
      console.log("Player Two did not enter a score")
    } else{
      inputScores(BPlayer,BPlayerScore)
    }

    db.one('SELECT team,player_one,player_two FROM teams where team = $1',oppTeamNumber)
     .then((teams)=>{
        console.log(getTeams)

        let team = teams.team
        let teamPlayer1 =teams.player_one
        let teamPlayer2 = teams.player_two

        ABPlayers.length=0
        ABPlayer(team,teamPlayer1,teamPlayer2)

            let otherTeam= ABPlayers.filter(team=>team.teamNumber==oppTeamNumber)
            console.log(otherTeam)

            res.render('input-second',{otherTeam:otherTeam, t1APlayer:t1APlayer, t1BPlayer:t1BPlayer})

                 })
            })

//inputs opponents score
router.post('/input-second',(req,res)=>{
        let teamNumber=parseInt(req.body.teamNumber)
        let APlayer= req.body.playerName1
        let BPlayer= req.body.playerName2
        let APlayerScore=parseInt(req.body.score1)
        let BPlayerScore=parseInt(req.body.score2)
        let t1APlayer = players.t1P1
        let t1BPlayer = players.t1P2
        t2APlayer = players.t2P1
        t2BPlayer = players.t2P2
        t2APlayer.teamNumber = teamNumber
        t2BPlayer.teamNumber = teamNumber
        t2APlayer.name = APlayer
        t2BPlayer.name = BPlayer
        t2APlayer.quota = parseInt(req.body.aPlayerQuota)
        t2BPlayer.quota = parseInt(req.body.bPlayerQuota)
        t2APlayer.played = isNoShow(req.body.onePlayed)
        t2BPlayer.played = isNoShow(req.body.twoPlayed)
        t2APlayer.overUnder = APlayerScore - t2APlayer.quota
        t2BPlayer.overUnder = BPlayerScore - t2BPlayer.quota
        t1APlayer = players.t1P1
        t1BPlayer = players.t1P2
        playerPoints(t1APlayer, t2APlayer)
        playerPoints(t1BPlayer, t2BPlayer)
        teamOneOverUnder = t1APlayer.overUnder + t1BPlayer.overUnder
        teamTwoOverUnder = t2APlayer.overUnder + t2BPlayer.overUnder
        teamPoints(t1APlayer,t1BPlayer,t2APlayer,t2BPlayer)
        console.log("Team 1 A player:", t1APlayer)
        console.log("Team 1 B player:",t1BPlayer)
        console.log("Team 2 A player:",t2APlayer)
        console.log("Team 2 B player:",t2BPlayer)
        console.log("Team One total points", teamOnePoints)
        console.log("Team Two total points", teamTwoPoints)

        if(isNaN(APlayerScore)){
          console.log("Player One did not enter a score")
        } else{
          inputScores(APlayer,APlayerScore)
        }
        if(isNaN(BPlayerScore)){
          console.log("Player Two did not enter a score")
        } else{
          inputScores(BPlayer,BPlayerScore)
        }

        res.send("scores are in")
    })





router.get("/quotas",(req,res)=>{

      calculateQuotas()
      console.log(thisWeeksQuotas)
      res.render('quotas',{thisweek:thisWeeksQuotas})

        })


router.post("/getquotas",(req,res)=>{
          //thisWeeksQuotas.length=0
    calculateQuotas()
    console.log(thisWeeksQuotas)
    res.render('quotas',{thisweek:thisWeeksQuotas})

            })
    // use this to prepopulate the scoring input not yet

/*
router.('/input-scores',(res,req)=>{
    getteams()
    res.render('input-scores',{ABPlayers:ABPlayers})
})
*/

//Functions to calculate points awarded per team
function isNoShow(boxValue) {
  console.log(boxValue)
  if (boxValue == 'false') {
    return false
  }
  else{
    return true
  }
}
function playerPoints(playerOne, playerTwo) {
  if(playerOne.played == false && playerTwo.played == false){
    playerOne.overUnder = -3
    playerTwo.overUnder = -3
    teamOnePoints += 0
    teamTwoPoints += 0
  } else if (playerOne.played == false){
    playerOne.overUnder = -3
    if(playerOne.overUnder > playerTwo.overUnder){
      teamOnePoints += 0
    } else if (playerOne.overUnder < playerTwo.overUnder) {
      teamTwoPoints += 3
    } else {
      teamOnePoints += 0
      teamTwoPoints += 1.5
    }
  } else if(playerTwo.played == false){
    playerTwo.overUnder = -3
    if(playerOne.overUnder > playerTwo.overUnder){
      teamOnePoints += 3
    } else if (playerOne.overUnder < playerTwo.overUnder) {
      teamTwoPoints += 0
    } else {
      teamOnePoints += 1.5
      teamTwoPoints += 0
    }
  } else if(playerOne.overUnder > playerTwo.overUnder){
    teamOnePoints += 3
  } else if (playerOne.overUnder < playerTwo.overUnder) {
    teamTwoPoints += 3
  } else {
    teamOnePoints += 1.5
    teamTwoPoints += 1.5
  }
}

function teamPoints(teamOnePlayerOne,teamOnePlayerTwo,teamTwoPlayerOne,teamTwoPlayerTwo) {
  if (teamOnePlayerOne.played == false){
    if(teamOnePlayerTwo.played == false){
      if (teamTwoPlayerOne.played == false && teamTwoPlayerTwo.played == false){
        teamOnePoints = 0
        teamTwoPoints = 0
      }
      else if(teamTwoPlayerOne.played == false || teamTwoPlayerTwo.played == false){
        if (teamOneOverUnder > teamTwoOverUnder){
          teamOnePoints += 0
        } else if (teamOneOverUnder < teamTwoOverUnder) {
          teamTwoPoints += 2
        } else {
          teamOnePoints += 0
          teamTwoPoints += 1
        }
      }
      else {
        if (teamOneOverUnder > teamTwoOverUnder){
        teamOnePoints += 0
      } else if (teamOneOverUnder < teamTwoOverUnder) {
        teamTwoPoints += 4
      } else {
        teamOnePoints += 0
        teamTwoPoints += 2
      }
    }
    } else if(teamTwoPlayerOne.played == false && teamTwoPlayerTwo.played == false){
      if (teamOneOverUnder > teamTwoOverUnder){
        teamOnePoints += 2
      } else if (teamOneOverUnder < teamTwoOverUnder) {
        teamTwoPoints += 0
      } else {
        teamOnePoints += 1
        teamTwoPoints += 0
      }
    }
    else if(teamTwoPlayerOne.played == false || teamTwoPlayerTwo.played == false){
      if (teamOneOverUnder > teamTwoOverUnder){
        teamOnePoints += 2
      } else if (teamOneOverUnder < teamTwoOverUnder) {
        teamTwoPoints += 2
      } else {
        teamOnePoints += 1
        teamTwoPoints += 1
      }
    }
    else{
      if (teamOneOverUnder > teamTwoOverUnder){
        teamOnePoints += 2
      } else if (teamOneOverUnder < teamTwoOverUnder) {
        teamTwoPoints += 4
      } else {
        teamOnePoints += 1
        teamTwoPoints += 2
      }
    }
  } else if (teamOnePlayerTwo.played == false){
    if(teamOnePlayerOne.played == false){
      if (teamTwoPlayerOne.played == false && teamTwoPlayerTwo.played == false){
        teamOnePoints = 0
        teamTwoPoints = 0
      }
      else if(teamTwoPlayerOne.played == false || teamTwoPlayerTwo.played == false){
        if (teamOneOverUnder > teamTwoOverUnder){
          teamOnePoints += 0
        } else if (teamOneOverUnder < teamTwoOverUnder) {
          teamTwoPoints += 2
        } else {
          teamOnePoints += 0
          teamTwoPoints += 1
        }
      }
      else {
        if (teamOneOverUnder > teamTwoOverUnder){
        teamOnePoints += 0
      } else if (teamOneOverUnder < teamTwoOverUnder) {
        teamTwoPoints += 4
      } else {
        teamOnePoints += 0
        teamTwoPoints += 2
      }
    }
  } else if(teamTwoPlayerOne.played == false && teamTwoPlayerTwo.played == false){
      if (teamOneOverUnder > teamTwoOverUnder){
        teamOnePoints += 2
      } else if (teamOneOverUnder < teamTwoOverUnder) {
        teamTwoPoints += 0
      } else {
        teamOnePoints += 1
        teamTwoPoints += 0
      }
    }
    else if(teamTwoPlayerOne.played == false || teamTwoPlayerTwo.played == false){
      if (teamOneOverUnder > teamTwoOverUnder){
        teamOnePoints += 2
      } else if (teamOneOverUnder < teamTwoOverUnder) {
        teamTwoPoints += 2
      } else {
        teamOnePoints += 1
        teamTwoPoints += 1
      }
    }
    else{
      if (teamOneOverUnder > teamTwoOverUnder){
        teamOnePoints += 2
      } else if (teamOneOverUnder < teamTwoOverUnder) {
        teamTwoPoints += 4
      } else {
        teamOnePoints += 1
        teamTwoPoints += 2
      }
    }
  } else if (teamTwoPlayerOne.played == false){
    if(teamTwoPlayerTwo.played == false){
      if (teamOnePlayerOne.played == false && teamOnePlayerTwo.played == false){
        teamOnePoints = 0
        teamTwoPoints = 0
      }
      else if(teamOnePlayerOne.played == false || teamOnePlayerTwo.played == false){
        if (teamOneOverUnder > teamTwoOverUnder){
          teamOnePoints += 2
        } else if (teamOneOverUnder < teamTwoOverUnder) {
          teamTwoPoints += 0
        } else {
          teamOnePoints += 1
          teamTwoPoints += 0
        }
      }
      else {
        if (teamOneOverUnder > teamTwoOverUnder){
        teamOnePoints += 4
      } else if (teamOneOverUnder < teamTwoOverUnder) {
        teamTwoPoints += 0
      } else {
        teamOnePoints += 2
        teamTwoPoints += 0
      }
    }
  } else if(teamOnePlayerOne.played == false && teamOnePlayerTwo.played == false){
      if (teamOneOverUnder > teamTwoOverUnder){
        teamOnePoints += 0
      } else if (teamOneOverUnder < teamTwoOverUnder) {
        teamTwoPoints += 2
      } else {
        teamOnePoints += 1
        teamTwoPoints += 0
      }
    }
    else if(teamOnePlayerOne.played == false || teamOnePlayerTwo.played == false){
      if (teamOneOverUnder > teamTwoOverUnder){
        teamOnePoints += 2
      } else if (teamOneOverUnder < teamTwoOverUnder) {
        teamTwoPoints += 2
      } else {
        teamOnePoints += 1
        teamTwoPoints += 1
      }
    }
    else{
      if (teamOneOverUnder > teamTwoOverUnder){
        teamOnePoints += 4
      } else if (teamOneOverUnder < teamTwoOverUnder) {
        teamTwoPoints += 2
      } else {
        teamOnePoints += 2
        teamTwoPoints += 1
      }
    }
  }
  else if (teamTwoPlayerTwo.played == false){
    if(teamTwoPlayerOne.played == false){
      if (teamOnePlayerOne.played == false && teamOnePlayerTwo.played == false){
        teamOnePoints = 0
        teamTwoPoints = 0
      }
      else if(teamOnePlayerOne.played == false || teamOnePlayerTwo.played == false){
        if (teamOneOverUnder > teamTwoOverUnder){
          teamOnePoints += 2
        } else if (teamOneOverUnder < teamTwoOverUnder) {
          teamTwoPoints += 0
        } else {
          teamOnePoints += 1
          teamTwoPoints += 0
        }
      }
      else {
        if(teamOneOverUnder > teamTwoOverUnder){
        teamOnePoints += 4
      } else if (teamOneOverUnder < teamTwoOverUnder) {
        teamTwoPoints += 0
      } else {
        teamOnePoints += 2
        teamTwoPoints += 0
      }
      }
    } else if(teamOnePlayerOne.played == false && teamOnePlayerTwo.played == false){
      if (teamOneOverUnder > teamTwoOverUnder){
        teamOnePoints += 0
      } else if (teamOneOverUnder < teamTwoOverUnder) {
        teamTwoPoints += 2
      } else {
        teamOnePoints += 1
        teamTwoPoints += 0
      }
    }
    else if(teamOnePlayerOne.played == false || teamOnePlayerTwo.played == false){
      if (teamOneOverUnder > teamTwoOverUnder){
        teamOnePoints += 2
      } else if (teamOneOverUnder < teamTwoOverUnder) {
        teamTwoPoints += 2
      } else {
        teamOnePoints += 1
        teamTwoPoints += 1
      }
    }
    else{
      if (teamOneOverUnder > teamTwoOverUnder){
        teamOnePoints += 4
      } else if (teamOneOverUnder < teamTwoOverUnder) {
        teamTwoPoints += 2
      } else {
        teamOnePoints += 2
        teamTwoPoints += 1
      }
    }
  }
  else {
    if (teamOneOverUnder > teamTwoOverUnder){
      teamOnePoints += 4
    } else if (teamOneOverUnder < teamTwoOverUnder) {
      teamTwoPoints += 4
    } else {
      teamOnePoints += 2
      teamTwoPoints += 2
    }
  }
}

module.exports = router
