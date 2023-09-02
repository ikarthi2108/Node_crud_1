require('dotenv').config(); // dotenv to use environmental variables
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('../Node_crud_1/middlewares/logger');
const apiRoutes = require('./routes/api.js');
const fileUploadRoutes = require('../Node_crud_1/FileUpload/fileUpload'); // Import the fileUpload routes
const path = require('path');

const app = express(); // Creating the express object app
const port = process.env.PORT || 4000; // Getting the port from the env file

app.set('views', path.join(__dirname,'../', 'views'));

app.set('view engine', 'ejs');

app.use(express.static('uploads'));

// app.get('/form', (req, res) => {
//   res.sendFile(path.join(__dirname, 'views', 'form.html'));
// });

app.use(bodyParser.json()); // Parse the body of the request
app.use(logger); // Logger middleware which logs all the details of req and res

app.use('/api', apiRoutes); // API route path
app.use('/fileUpload', fileUploadRoutes); // Use the fileUpload routes

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
