const express = require("express");
const bodyParser = require("body-parser");

require("dotenv").config();

const app = express();
const port = 3001;

app.use(bodyParser.json());

app.get("/*", (req, res) => {
  res.send("Running");
});
app.post("/", (req, res) => {
  const body = req.body;
});

app.listen(port, () => {
  console.log(`Server running on port ${port}!`);
});
