// routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken'); //import jwt token
const router = express.Router();

const { readData } = require('../utils/dataUtils'); // function to read the data

// Authentication route
router.post('/login', (req, res) => {
  const { name } = req.body;           // get the name of the particular user
  const users = readData();

  const user = users.find(user => user.name === name);  //check the name is found in tha data

  if (!user) {
    return res.status(401).json({ message: 'User not found' });
  }

  const token = jwt.sign({ name: user.name }, process.env.ACCESS_TOKEN);  // if found creates an token

  res.json({ message: 'Login successful', token });
});

const validateToken = (req, res, next) => {           //Middleware function to validate the token
    const token = req.header('Authorization');
  
    if (!token) {
      return res.status(401).json({ message: 'Access denied. Token not provided.' });
    }
  
    const formattedToken = token.split('Bearer ')[1];  // indicating that we are add beare and and check the first indexed item
  
    try {
      const decoded = jwt.verify(formattedToken, process.env.ACCESS_TOKEN);  // verify the token we provided in authorization and the exact
      req.decodedUser = decoded; // Store the decoded user data in the request object
      next(); // Move to the next middleware or route
    } catch (error) {
      res.status(401).json({ message: 'Invalid token.' }); //passing error code 401
    }
  };
  
  // Protected route to retrieve user data based on token
  router.get('/user', validateToken, (req, res) => { // pasing the validate function as an middleware
    const userData = readData();
    const requestedUser = userData.find(user => user.name === req.decodedUser.name);
  
    if (!requestedUser) {
      return res.status(404).json({ message: 'Requested user not found.' });
    }
  
    res.json(requestedUser); // displays that users data alone
  });
  

module.exports = router;
