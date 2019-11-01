const lottery = require('./lottery')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

// Draws a new winner every day!
const drawWinner = async () => {
  const winner = await lottery.getWinner()
  winner
    ? console.log(`THE LUCKY WINNER IS ${winner}!`)
    : console.log('EVERYONE HAS ALREADY WON! MERRY CHRISTMAS!')
}
setInterval(drawWinner, 1000 * 60 /* 60 * 24*/)

drawWinner()
