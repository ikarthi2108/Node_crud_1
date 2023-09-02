// global error handler dile


  
  function createInternalServerError(message) {
    const error = new Error(message);
    error.statusCode = 500;  //internal srver error
    return error;
  }
  

  module.exports = {
    createInternalServerError,
  };
  