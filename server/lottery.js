const fetch = require('node-fetch')
const queries = require('./queries')

require('dotenv').config()
const apiUrl = process.env.API_URL
const apiKey = process.env.API_KEY

const getQueryResults = async query => {
  try {
    const jsonQuery = JSON.stringify({ query: query })
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'x-api-key': apiKey
      },
      body: jsonQuery
    })
    const json = await response.json()
    return json.data
  } catch (error) {
    console.error('Api query failed.\n', error.message)
  }
}

const getCurrentTime = () => {
  const currentTime = Math.round(new Date().getTime() / 1000)
  return currentTime - 60 * 60 * 24
}

const getWinner = async () => {
  try {
    getCurrentTime()
    const contestantsQuery = queries.getContestants(getCurrentTime())
    const contestantsQueryResults = await getQueryResults(contestantsQuery)
    let contestants = contestantsQueryResults.listUsers.items
    console.log('CONTESTANTS', contestants)
    // Filter people that have already won:
    contestants = contestants.filter(c => !c.winner)
    // Return null if no contestants:
    if (contestants.length === 0) {
      console.log('No contestants.')
      return null
    }
    const winner = contestants[Math.floor(Math.random() * contestants.length)]
    const winnerQuery = queries.postNewWinner(winner.id, winner.date)
    const winnerQueryResults = await getQueryResults(winnerQuery)
    console.log('The winner is', winnerQueryResults.updateUser.name)
    return winnerQueryResults.updateUser.name
  } catch (error) {
    console.error(
      'Contestants couldn\'t be retrieved from database.\n',
      error.message
    )
  }
}

module.exports = { getWinner }
