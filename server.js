require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;
const cors = require('cors');
const connection = require('./connection/config');
const morgan = require('morgan');

//middleware
app.use(express.json());
app.use(cors({origin: 'http//localhost:3000'}));
app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      '-',
      tokens.url(req, res),
      '-',
      tokens.status(req, res),
      '-',
      tokens['response-time'](req, res),
      'ms',
    ].join(' ');
  })
);

app.use('/api', require('./routes/router'));

app.listen(port, () => {
  connection();
  console.log('Server is running on port', port);
});
