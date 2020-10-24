const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

/** moderation service:
 * - waits for requests from the events of type 'CommentCreated';
 * - once received searches for the property to moderate;
 * - emmits the req once the comment is moderated;
 * - is received on the comment service
 */
const app = express();
app.use(bodyParser.json());

app.post('/events', async (req, res) => {
  const { type, data } = req.body;
  if (type === 'CommentCreated') {
    const status = data.content.includes('orange') ? 'rejected' : 'approved';
    console.log(status)
    axios.post('http://localhost:4005/events', {
      type: 'CommentModerated',
      data: {
        id: data.id,
        content: data.content,
        postId: data.postId,
        status
      }
    });
  }
  res.send({});
});

app.listen(4003, () => {
  console.log('listening on 4003');
})