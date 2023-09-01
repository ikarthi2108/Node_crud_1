function validateData(req, res, next) {
    const { id,empname,position, salary } = req.body; 
  
    if (!id || !empname ||!position || !salary) {
      return res.status(400).json({ message: 'All fields (id, name, email) are required' });  // it will check weather all fields are present
    }
  
    if (id === '' || empname === '' || position === '' || salary === '') {  //it will fields are not empty
      return res.status(400).json({ message: 'Fields cannot be empty' });
    }
  
    next();
  }
  
  module.exports = validateData;
  