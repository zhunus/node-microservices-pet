const express = require("express");
const { json } = require("body-parser");
const axios = require("axios");

const app = express();

app.use(json());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  console.log(`Event occured: ${type}`);
  if (type === "CommentCreated") {
    const status = data.content.includes("orange") ? "rejected" : "approved";
    await axios.post("http://localhost:4005/events", {
      type: "CommentModerated",
      data: { ...data, status },
    });
  }

  res.sendStatus(200);
});

app.listen(4003, () => {
  console.log("Moderation listening on 4003");
});
