// index.js
require('dotenv').config()  // dotenv to use the environmental variables
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./middlewares/logger.js');
const apiRoutes = require('./routes/api.js');

const app = express(); //creating express object app
const port = process.env.PORT || 4000;  // getting port from env file

app.use(bodyParser.json()); //parse the body of the request
app.use(logger); // logger file which logs all the details of req and res

app.use('/api', apiRoutes); // route path

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
