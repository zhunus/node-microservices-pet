const express = require("express");
const { json } = require("body-parser");
const axios = require("axios");

const app = express();

app.use(json());

app.post("/events", (req, res) => {
  const event = req.body;

  axios.post("http://localhost:4000/events", event).catch(console.log);
  axios.post("http://localhost:4001/events", event).catch(console.log);
  axios.post("http://localhost:4002/events", event).catch(console.log);

  res.send({ status: "OK" });
});

app.listen(4005, () => {
  console.log("EB listening on 4005");
});
