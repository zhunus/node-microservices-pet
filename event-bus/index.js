const express = require("express");
const { json } = require("body-parser");
const axios = require("axios");

const app = express();

app.use(json());

const events = [];

app.post("/events", (req, res) => {
  const event = req.body;

  events.push(event);

  axios.post("http://localhost:4000/events", event).catch(console.log);
  axios.post("http://localhost:4001/events", event).catch(console.log);
  axios.post("http://localhost:4002/events", event).catch(console.log);
  axios.post("http://localhost:4003/events", event).catch(console.log);

  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log("EB listening on 4005");
});
