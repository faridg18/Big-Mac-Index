const express = require("express");
const app = express();
const csvFilePath = "./dataset.csv";
const csv = require("csvtojson");
var cors = require("cors");
const https = require("https");
const publicIp = require("public-ip");
const fs = require("fs-extra");

app.use(cors());

// Get the current country of the user
app.get("/country", async (req, res) => {
  let ip = await publicIp.v4();
  https
    .get("https://ipvigilante.com/json/" + ip, resp => {
      let data = "";

      // A chunk of data has been recieved.
      resp.on("data", chunk => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on("end", () => {
        fs.readJson("./new-data.json")
          .then(packageObj => {
            let info = {};
            let userData = JSON.parse(data);
            for (let i = 0; i < packageObj.length; i++) {
              if (packageObj[i].Country === userData.data.country_name) {
                info = {... packageObj[i], index: i};
                break;
              }
            }
            res.send(info);
          })
          .catch(err => {
            res.send(err);
          });
      });
    })
    .on("error", err => {
      res.send("Error: " + err.message);
    });
});

// Get the CSV in JSON format
app.get("/csv", (req, res) => {
  
  fs.readJson("./new-data.json")
    .then(packageObj => {
      res.send(packageObj);
    })
    .catch(err => {
      res.send(err)
    });
});

app.listen(8080, () => {
  console.log("server is running in port 8080");
});
