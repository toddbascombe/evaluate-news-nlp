const express = require("express");
const app = express();
const port = 8080;
const cors = require('cors');
const bodyParser = require("body-parser")

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("client"));


app.get("/", (req, res) => {
    res.send('index.html');
});

app.post("/", (req, res) => {
    console.log("done")
})

app.listen(port, () => {
    console.log("The Server is Up and running")
})