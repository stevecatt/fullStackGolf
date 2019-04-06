const express = require('express')
const models = require('./models')
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const pgp = require('pg-promise')()

const connectionString = {
  "host": "isilo.db.elephantsql.com",
  "port": 5432,
  "database": "awfaxvvb",
  "user": "awfaxvvb",
  "password":"7xy3FG5wa6SjbIthlLs90vKIieG03pVG"

}

const db = pgp(connectionString)


app.use(bodyParser.urlencoded({ extended: false }))
app.engine('mustache',mustacheExpress())
app.set('views','./views')
app.set('view engine','mustache')

db.any('SELECT * FROM "Quotas"')
.then ((quota)=>{
  console.log(quota)
})





app.listen(3000,function(){
  console.log("node server has started")
})
