const fs = require('fs');

function logger(req, res, next) { //logger middleware function which will present the type request and the request date as an log message
  const logMessage = `${req.method} ${req.url}\n`;
  fs.appendFile('access.log', logMessage, err => {  //this will add the items in the access.log file
    if (err) {
      console.error('Error writing to log file:', err);
    }
  });
  next(); // goes to the next middleware
}

module.exports = logger; // exports the logger function
