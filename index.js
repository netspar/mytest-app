const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/', (req, res) => {
  res.send("Hello World!");
});

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', async (req, res) => {
  console.log("Creating a new Post ...");
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;
  posts[id] = {
    id,
    title
  }

  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("Recieved Event", req.body.type);
  res.send({});
});


app.listen(3000, () => {
  console.log("Listening Posts service on port 4000");
});