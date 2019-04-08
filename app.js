const express = require('express')
const models = require('./models')
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const pgp = require('pg-promise')()
const adminCredRoutes = require('./routes/admin-credentials')

const connectionString = {
  "host": "isilo.db.elephantsql.com",
  "port": 5432,
  "database": "awfaxvvb",
  "user": "awfaxvvb",
  "password":"7xy3FG5wa6SjbIthlLs90vKIieG03pVG"

}

const db = pgp(connectionString)
let session = require('express-session')
app.use(session({
  secret: 'Quoth the raven, beware, for twas brillig',
  resave: false,
  saveUninitialized: true
}))


app.use('/', adminCredRoutes)
app.use(bodyParser.urlencoded({ extended: false }))
app.engine('mustache',mustacheExpress())
app.set('views','./views')
app.set('view engine','mustache')


//gets the scores from database and calculates quotas based on league rules
app.get("/quotas",(req,res)=>{
db.any('SELECT * FROM "Quotas"')
.then ((quotas)=>{
  //console.log(quotas)
  for(index=0;index<quotas.length;index++){
    let quota=quotas[index]

    console.log(quota)
    if(quota.q1==null){
      let thisWeekQuota=5
      console.log(thisWeekQuota)
    }
    else if(quota.q2==null){
      let thisWeekQuota=quota.q1+3
      console.log(thisWeekQuota)
    }
    else if(quota.q3==null){
      if(quota.q1>=quota.q2){
        let thisWeekQuota=quota.q1
        console.log(thisWeekQuota)
      }
      else(thisWeekQuota=quota.q2)
      console.log(thisWeekQuota)
    }
    else if(quota.q4==null){
      let thisWeekQuota=(quota.q1+quota.q2+quota.q3)/3
      console.log(thisWeekQuota)

    }
    else if(quota.q5==null){
      let thisWeekQuota=(quota.q1+quota.q2+quota.q3+quota.q4)/4
      console.log(thisWeekQuota)
    }
    else if(quota.q6==null){
      let thisWeekQuota=(quota.q1+quota.q2+quota.q3+quota.q4+quota.q5)/5
      console.log(thisWeekQuota)
    }
    else if(quota.q7==null){
      let thisWeekQuota=(quota.q1+quota.q2+quota.q3+quota.q4+quota.q5+quota.q6)/6
      console.log(thisWeekQuota)
    }
    else if(quota.q8==null){
      let thisWeekQuota=(quota.q1+quota.q2+quota.q3+quota.q4+quota.q5+quota.q6+quota.q7)/7
      console.log(thisWeekQuota)
    }
    else if(quota.q9==null){
      let thisWeekQuota=(quota.q1+quota.q2+quota.q3+quota.q4+quota.q5+quota.q6+quota.q7+quota.q8)/8
      console.log(thisWeekQuota)
    }
    else if(quota.q10==null){
      let thisWeekQuota=(quota.q1+quota.q2+quota.q3+quota.q4+quota.q5+quota.q6+quota.q7+quota.q8+quota.q9)/9
      console.log(thisWeekQuota)
    }
    else if(quota.q11==null){
      let thisWeekQuota=(quota.q1+quota.q2+quota.q3+quota.q4+quota.q5+quota.q6+quota.q7+quota.q8+quota.q9+quota.q10)/10
      console.log(thisWeekQuota)
    }
    else{let thisWeekQuota=(quota.q1+quota.q2+quota.q3+quota.q4+quota.q5+quota.q6+quota.q7+quota.q8+quota.q9+quota.q10)/10

      console.log(thisWeekQuota)
    }
  }
  res.render('quotas',{quotas:quotas})

})

})



app.listen(3000,function(){
  console.log("node server has started")
})
