const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

/** query service: handles presentation logic 
 * - provides a full listing of posts and comments;
 * - receives events from event bus; */

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

const handleEvent = (type, data) => {
  switch (type) {
    case 'PostCreated': {
      //get the id and title from the data obj (on event obj)
      const { id, title } = data;
      //create the id property on posts obj
      posts[id] = { id, title, comments: [] };
      break;
    }
    case 'CommentCreated': {
      const { id, content, postId, status } = data;
      const post = posts[postId];
      //push new comment to the post with the relevant id
      post.comments.push({ id, content, status });
      break;
    }
    case 'CommentUpdated': {
      const { id, content, postId, status } = data;
      const post = posts[postId];
      const comment = post.comments.find(c => c.id === id);
      comment.status = status;
      comment.content = content;
      break;
    }
    default:
  }
}

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;
  handleEvent(type, data);

  res.send({});
});

app.listen(4002, async () => {
  console.log('listening on 4002');

  const res = await axios.get('http://localhost:4005/events');
  for (let event of res.data) {
    console.log('Processing event: ', event.type);
    handleEvent(event.type, event.data);
  }
});