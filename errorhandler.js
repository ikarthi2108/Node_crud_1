// global error handler dile

function createNotFoundError(message) {
    const error = new Error(message);  //page not fount error
    error.statusCode = 404;
    return error;
  }
  
  function createInternalServerError(message) {
    const error = new Error(message);
    error.statusCode = 500;  //internal srver error
    return error;
  }
  
  function createBadGatewayError(message) {
    const error = new Error(message);
    error.statusCode = 502;
    return error;  //badgateway error
  }
  
  module.exports = {
    createNotFoundError,
    createInternalServerError,
    createBadGatewayError,
  };
  