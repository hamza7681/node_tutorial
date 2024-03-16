require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;
const cors = require('cors');
const connection = require('./connection/config');

//middleware
app.use(express.json());
app.use(cors({origin: 'http//localhost:3000'}));

app.use('/api', require('./routes/router'));

app.listen(port, () => {
  connection();
  console.log('Server is running on port', port);
});
