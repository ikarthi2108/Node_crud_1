// index.js
require('dotenv').config()  // dotenv to use the environmental variables
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./middlewares/logger.js');
const apiRoutes = require('./routes/api.js');
const uploadRoutes = require('./routes/upload.js');
const path=require('path')


const app = express(); //creating express object app
const port = process.env.PORT || 4000;  // getting port from env file

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json()); //parse the body of the request
app.use(logger); // logger file which logs all the details of req and res

app.use('/api', apiRoutes); // route path
app.use('/upload', uploadRoutes); 

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
