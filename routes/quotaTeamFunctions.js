module.exports =function ABPlayer(team,teamPlayer1,teamPlayer2){

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

//original lookup for players
    router.post('/team-sign-in',(req,res)=>{
        let teamNumber=parseInt(req.body.teamNumber)
        let password = req.body.password
        let week = parseInt(req.body.week)
        console.log(teamNumber)
        console.log(password)
        db.one('SELECT team,hash, player_one,player_two FROM teams WHERE team = $1',[teamNumber])
        .then((hash)=>{
            console.log(hash)
            bcrypt.compare(password,hash.hash,function(err,result){
                if (result==true){
                    console.log("success")
                    //going to add a query to schedule by week to find players
                    let team1Player1=hash.player_one
                    let team1Player2=hash.player_two
                    let team1number=hash.team
    
    
    
    
    
                    //this is hardcode for now
                    let team2Number=30
                    let team2Player1="billy"
                    let team2Player2="bob"
    
                    let teams = {week:week,team1Number:team1number,team1Player1:team1Player1, team1Player2:team1Player2,team2Number:team2Number,team2Player1:team2Player1,team2Player2:team2Player2}
                    
                    res.redirect('/input-scores')
                    
                }else{
                    console.log("wrong Password")
                    res.render('sign-in-team',{message:"Incorrect Password"})
                   
                }
            })
        })
    
        
    })