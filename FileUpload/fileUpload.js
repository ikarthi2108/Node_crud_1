const path = require('path');
const multer = require('multer');
const express = require('express');

const router = express.Router();

const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, callback) => {
    const timestamp = Date.now();
    const fileName = `${timestamp}_${file.originalname}`;
    callback(null, fileName);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1000 * 1000 },
}).single('pic');

router.get('/form', (req, res) => {
  res.sendFile(path.join(__dirname,'../', 'views', 'form.html'));
});

router.post('/upload', upload, (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  console.log('Upload successful');
  res.send('Upload Success');
});

module.exports = router;
