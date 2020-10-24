const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

/** query service: 
 * - provides a full listing of posts and comments;
 * - receives events from event bus; */

const app = express();
app.use(bodyParser.json());
app.use(cors());