const lottery = require('./lottery')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

lottery.getWinner()
