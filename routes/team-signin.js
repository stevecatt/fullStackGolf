const express = require('express')
const bodyParser = require('body-parser')
const pgp = require('pg-promise')()
const router = express.Router()
const bcrypt = require('bcrypt')
const saltRounds = 10
router.use(bodyParser.urlencoded({ extended: false }))

let thisWeeksQuotas=[]
let ABPlayers=[]

router.get('/team-sign-in',(req,res)=>{
    res.render('sign-in-team')
})
// // function calculateQuota(teamplayer){
//     db.any('SELECT * FROM "steveq_test" where golfer = $1',teamplayer)
//     .then ((quotas)=>{
//     //console.log(quotas)
//       for(index=0;index<quotas.length;index++){
//       let quota=quotas[index]
  
//         //console.log(quota)
//         if(quota.q1==null){
//           return thisWeekQuota=5
//           //et quotapush = {name:quota.golfer,quota:thisWeekQuota,newbie:"*"}
//           //thisWeeksQuotas.push(quotapush)
  
//         //console.log(thisWeekQuota)
//           //console.log(quota.golfer)
//       }
//         else if(quota.q2==null){
//           return thisWeekQuota=quota.q1+3
//         // let quotapush = {name:quota.golfer,quota:thisWeekQuota,newbie:"*"}
//         // thisWeeksQuotas.push(quotapush)
//         // //console.log(thisWeekQuota)
//       }
//       else if(quota.q3==null){
//         if(quota.q1>=quota.q2){
//           return thisWeekQuota=quota.q1
//         //   let quotapush = {name:quota.golfer,quota:thisWeekQuota,newbie:"*"}
//         // thisWeeksQuotas.push(quotapush)
//           //console.log(thisWeekQuota)
//         }
//         else{return thisWeekQuota=quota.q2
//         //let quotapush = {name:quota.golfer,quota:thisWeekQuota,newbie:"*"}
//         //thisWeeksQuotas.push(quotapush)
//         //console.log(thisWeekQuota)
//       }
//     }
//       else if(quota.q4==null){
//         return thisWeekQuota=Math.round((quota.q1+quota.q2+quota.q3)/3)
//         // let quotapush = {name:quota.golfer,quota:thisWeekQuota,newbie:"*"}
//         // thisWeeksQuotas.push(quotapush)
//         //console.log(thisWeekQuota)
  
//       }
//       else if(quota.q5==null){
//         return thisWeekQuota=Math.round((quota.q1+quota.q2+quota.q3+quota.q4)/4)
//         // let quotapush = {name:quota.golfer,quota:thisWeekQuota,newbie:"*"}
//         // thisWeeksQuotas.push(quotapush)
//         //console.log(thisWeekQuota)
//       }
//       else if(quota.q6==null){
//         return thisWeekQuota=Math.round((quota.q1+quota.q2+quota.q3+quota.q4+quota.q5)/5)
//         // let quotapush = {name:quota.golfer,quota:thisWeekQuota,newbie:"*"}
//         // thisWeeksQuotas.push(quotapush)
//         //console.log(thisWeekQuota)
//       }
//       else if(quota.q7==null){
//         return thisWeekQuota=Math.round((quota.q1+quota.q2+quota.q3+quota.q4+quota.q5+quota.q6)/6) 
//         //hisWeeksQuotas.push(quotapush)
//         //console.log(thisWeekQuota)
//       }
//       else if(quota.q8==null){
//         return thisWeekQuota=Math.round((quota.q1+quota.q2+quota.q3+quota.q4+quota.q5+quota.q6+quota.q7)/7)
//         // let quotapush = {name:quota.golfer,quota:thisWeekQuota,newbie:"*"}
//         // thisWeeksQuotas.push(quotapush)
//         //console.log(thisWeekQuota)
//       }
//       else if(quota.q9==null){
//         return thisWeekQuota=Math.round((quota.q1+quota.q2+quota.q3+quota.q4+quota.q5+quota.q6+quota.q7+quota.q8)/8 )
//         //hisWeeksQuotas.push(quotapush)
//         //console.log(thisWeekQuota)
//       }
//       else if(quota.q10==null){
//         return thisWeekQuota=Math.round((quota.q1+quota.q2+quota.q3+quota.q4+quota.q5+quota.q6+quota.q7+quota.q8+quota.q9)/9 )
//         ////console.log(thisWeekQuota)
//       }
//       else if(quota.q11==null){
//         return thisWeekQuota=Math.round((quota.q1+quota.q2+quota.q3+quota.q4+quota.q5+quota.q6+quota.q7+quota.q8+quota.q9+quota.q10)/10 )
//         // let quotapush = {name:quota.golfer,quota:thisWeekQuota,newbie:"*"}
//         // thisWeeksQuotas.push(quotapush)
//         // //console.log(thisWeekQuota)
//       }
//       else{let thisWeekQuota=Math.round((quota.q1+quota.q2+quota.q3+quota.q4+quota.q5+quota.q6+quota.q7+quota.q8+quota.q9+quota.q10)/10)
//         return quotapush = {name:quota.golfer,quota:thisWeekQuota}
//         //thisWeeksQuotas.push(quotapush)
//         //console.log(thisWeekQuota)
//       }
//       //console.log(thisWeekQuota)
//     }
   
  
//   })
//   }


function getTeam(team){
    db.any('SELECT team,player_one,player_two FROM teams where team =$1',team)
    .then((teams)=>{
        
        for (i=0; i < teams.length; i++){
            let team = teams[i].team
            let teamPlayer1 =teams[i].player_one
            let teamPlayer2 = teams[i].player_two
            
            ABPlayer(team,teamPlayer1,teamPlayer2)
            

        }
        
        

        })
        
    
}



function ABPlayerone(team,teamPlayer1,teamPlayer2){

    let teamNumber=team
    let thisweekplayer1 = thisWeeksQuotas.filter(quota=>quota.name==teamPlayer1)
    let thisweekplayer2 = thisWeeksQuotas.filter(quota=>quota.name==teamPlayer2)
    console.log (thisweekplayer1)
   
    if(thisweekplayer1.quota >= thisweekplayer2.quota){
         APlayer= teamPlayer1
         BPlayer= teamPlayer2
         APlayerQuota=thisweekplayer1.quota
         BPlayerQuota=thisweekplayer2.quota
        

    }else{
         APlayer=teamPlayer2
         BPlayer=teamPlayer1
         APlayerQuota=thisweekplayer2.quota
         BPlayerQuota=thisweekplayer1.quota
       
    }

   let ABPlayersPush = {teamNumber:teamNumber,APlayer:APlayer, APlayerQuota:APlayerQuota,BPlayer:BPlayer,BPlayerQuota:BPlayerQuota}
   ABPlayers.push(ABPlayersPush)
   console.log(ABPlayers)
    
    }


// router.post('/team-sign-in',(req,res)=>{
//     let teamNumber=parseInt(req.body.teamNumber)
//     let password = req.body.password
//     let week = parseInt(req.body.week)
//     db.one('SELECT team,hash, player_one,player_two FROM teams WHERE team = $1',[teamNumber])
//     .then((hash)=>{
//         console.log(hash)
        
//         bcrypt.compare(password,hash.hash,function(err,result){
//             if (result==true){
//                 console.log("success")
//                 let team= hash.team
//                let teamPlayer1=hash.player_one
//                let teamPlayer2=hash.player_two
//                 calculateQuotas()
//                 console.log(thisWeeksQuotas)
//                 getTeam(team)
//                 ABPlayerone(team,teamPlayer1,teamPlayer2)
//                 console.log("this is the ABoutput")
//                 console.log(ABPlayers)
//                 res.render('input-scores',{ABPlayers:ABPlayers})
//             }else{
//                 console.log('wrong password')
//                 res.redirect('/team-sign-in')
//             }
//         })
//     })    
// })


//original code trying to use ab players now 

// router.post('/team-sign-in',(req,res)=>{
//     let teamNumber=parseInt(req.body.teamNumber)
//     let password = req.body.password
//     let week = parseInt(req.body.week)
//     console.log(teamNumber)
//     console.log(password)
//     db.one('SELECT team,hash, player_one,player_one FROM teams WHERE team = $1',[teamNumber])
//     .then((hash)=>{
//         console.log(hash)
//         bcrypt.compare(password,hash.hash,function(err,result){
//             if (result==true){
//                 console.log("success")
//                 //going to add a query to schedule by week to find players
//                 let teamPlayer1=hash.player_one
//                 let teamPlayer2=hash.player_two
//                 let team1number=hash.team
//                 //calculateQuota(teamPlayer1)
                
//                 //calculateQuota(teamPlayer2)
//                // console.log()
              
                




//                 //this is hardcode for now
//                 // let team2Number=30
//                 // let team2Player1="billy"
//                 // let team2Player2="bob"

//                  let teams = {week:week,team1Number:team1number,team1Player1:team1Player1, team1Player2:team1Player2,team2Number:team2Number,team2Player1:team2Player1,team2Player2:team2Player2}
                
//                 res.redirect('/input-scores')
                
//             }else{
//                 console.log("wrong Password")
//                 res.render('sign-in-team',{message:"Incorrect Password"})
               
//             }
//         })
//     })

    
// })









module.exports = router