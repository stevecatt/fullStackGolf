const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const saltRounds = 10
const pgp = require('pg-promise')()

router.use(bodyParser.urlencoded({ extended: false }))

router.get('/weekly-schedule',(req,res)=>{
    console.log("were looking for the teams")
    let week = 1
        db.any('SELECT * FROM test_schedule WHERE week =$1',[week])
        .then((schedule)=>{
        console.log(schedule)

        })
})

module.exports = router