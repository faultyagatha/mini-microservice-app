const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

/** query service: handles presentation logic 
 * - provides a full listing of posts and comments;
 * - receives events from event bus; */

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;
  if (type === 'PostCreated') {
    //get the id and title from the data obj (on event obj)
    const { id, title } = data;
    //create the id property on posts obj
    posts[id] = { id, title, comments: [] };
  }
  if (type === 'CommentCreated') {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    //push new comment to the post with the relevant id
    post.comments.push({ id, content, status });
  }
  if (type === 'CommentUpdated') {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    const comment = post.comments.find(c => c.id === id);
    comment.status = status;
    comment.content = content;
  }

  res.send({});
});

app.listen(4002, () => {
  console.log('listening on 4002');
})