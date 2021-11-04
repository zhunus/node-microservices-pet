const express = require("express");
const cors = require("cors");
const { json } = require("body-parser");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(json());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

function handleEvent(type, data) {
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[data.id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    post.comments.push({ id, content, status });
  }

  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    const comment = post.comments.find((c) => c.id === id);
    comment.status = status;
    comment.content = content;
  }
}

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  handleEvent(type, data);

  res.sendStatus(200);
});

app.listen(4002, async () => {
  console.log("Listending on 4002");

  try {
    const response = await axios.get("http://localhost:4005/events");
    for (let event of response.data) {
      console.log(`processing event: ${event.type}`);
      handleEvent(event.type, event.data);
    }
  } catch {
    console.log("sww");
  }
});
