const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

/** event Object = {
 * type: 'PostCreated' || 'CommentCreated' || 'CommentModerated',
 * data: { id: '26', content: 'new post', postId: '29373', status: 'pending' }
 * }
*/

app.post('/events', (req, res) => {
  const event = req.body;
  console.log(event)
  axios.post('http://localhost:4000/events', event); //posts
  axios.post('http://localhost:4001/events', event); //comments
  axios.post('http://localhost:4002/events', event); //query
  axios.post('http://localhost:4003/events', event); //moderation service
  res.send({ status: 'OK' });
});

app.listen(4005, () => {
  console.log('listening at 4005');
})

