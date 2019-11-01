const getContestants = time => {
  return `query getcontestants {
    listUsers(limit: 700, filter: {date: {gt: ${time}}}) {
      items {
        id
        name
        date
        winner
      }
    }
  }`
}

const postNewWinner = (id, time) => {
  return `mutation updateUser {
    updateUser(input: {id: "${id}", winner: ${time}})
    {id
    name}
  }
  `
}

module.exports = {
  getContestants,
  postNewWinner
}
