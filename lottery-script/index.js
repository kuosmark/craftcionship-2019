const lottery = require('./lottery')

const drawWinner = async () => {
  const winner = await lottery.getWinner()
  winner
    ? console.log(`THE LUCKY WINNER IS ${winner}!`)
    : console.log('EVERYONE HAS ALREADY WON! MERRY CHRISTMAS!')
}

drawWinner()
