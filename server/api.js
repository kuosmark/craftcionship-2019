const fetch = require("node-fetch");
const queries = require("./queries");

require("dotenv").config();
const apiUrl = process.env.API_URL;
const apiKey = process.env.API_KEY;

// Executes query and returns results.
const getQueryResults = async query => {
  try {
    const jsonQuery = JSON.stringify({ query: query });
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "x-api-key": apiKey
      },
      body: jsonQuery
    });
    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error("Api query failed.\n", error.message);
  }
};

const listUsers = async () => {
  try {
    const query = queries.listUsers();
    const queryResults = await getQueryResults(query);
    const keywords = queryResults.listKeywords.items;
    return users;
  } catch (error) {
    console.error(
      "Users couldn't be retrieved from database.\n",
      error.message
    );
  }
};

module.exports = { listUsers };
