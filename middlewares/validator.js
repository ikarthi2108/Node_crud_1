function validateData(req, res, next) {
    const { id, name, email } = req.body; 
  
    if (!id || !name || !email) {
      return res.status(400).json({ message: 'All fields (id, name, email) are required' });  // it will check weather all fields are present
    }
  
    if (id === '' || name === '' || email === '') {  //it will fields are not empty
      return res.status(400).json({ message: 'Fields cannot be empty' });
    }
  
    next();
  }
  
  module.exports = validateData;
  