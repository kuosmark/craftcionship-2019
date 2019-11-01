// Returns all keywords from database.
const listKeywords = () => {
  return `query listUsers {
      listKeywords (limit: 10000) {
        items {
          id
        }
      }
    }`;
};

module.exports = {
  listUSers
};
