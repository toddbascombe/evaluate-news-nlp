require("dotenv").config();
const path = require("path");
const express = require("express");
const aylien = require("aylien_textapi");
const cors = require("cors");
const app = express();
const port = 8080;
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const textapi = new aylien({
  application_id: process.env.apiId,
  application_key: process.env.apiKey
});

app.use(cors());
app.use(express.static("dist"));

console.log(__dirname);

app.get("/", function(req, res) {
  res.sendFile("dist/index.html");
});

app.post("/", (req, res) => {
  console.log("we are in the server now");
  console.log(req.body);
  const data = req.body.data;
  const ai_res = aylien_func(data);
  res.send(ai_res);
});

const aylien_func = text => {
  textapi.sentiment(
    {
      text: text
    },
    function(error, response) {
      if (error === null) {
        return response;
      } else {
        return error;
      }
    }
  );
};

// designates what port the app will listen to for incoming requests
app.listen(port, function() {
  console.log("Example app listening on port " + port);
});
