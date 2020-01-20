require("dotenv").config();
const path = require("path");
const express = require("express");
const aylien = require("aylien_textapi");
const cors = require("cors");
const app = express();

const textapi = new aylien({
  application_id: process.env.apiId,
  application_key: process.env.apiKey
});

app.use(cors());
app.use(express.static("client"));

console.log(__dirname);

app.get("/", function(req, res) {
  // res.sendFile("dist/index.html");
  res.sendFile("../client/views/index.html");
});

app.post("/", (req, res) => {});

// designates what port the app will listen to for incoming requests
app.listen(8080, function() {
  console.log("Example app listening on port 8080!");
});
