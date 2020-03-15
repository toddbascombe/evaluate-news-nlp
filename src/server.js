require("dotenv").config();
const express = require("express");
const app = express();
const port = 8080;
const cors = require("cors");
const bodyParser = require("body-parser");
const AYLIENTextAPI = require("aylien_textapi");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("client"));

const projectData = {};

const textapi = new AYLIENTextAPI({
  application_id: process.env.apiId,
  application_key: process.env.apiKey
});

app.get("/", (req, res) => {
  res.send("index.html");
});

app.post("/", async (req, res) => {
  const data = req.body.value;
  await textapi.sentiment(
    {
      url: data,
      mode: "document"
    },
    async function(error, response) {
      if (error === null) {
        projectData.ai_info = await response;
        return await response;
      } else {
        const errors =
          "Can not analyze current article, please check the url and try again";
        projectData.errors = errors;
        return errors;
      }
    }
  );
});

app.get("/data", (req, res) => {
  res.send([projectData]);
});

app.listen(port, () => {
  console.log("The Server is Up and running");
});
