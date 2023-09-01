// routes/upload.js
const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// router.set('views', path.join(__dirname, 'views'));
// router.set('view engine', 'ejs');

router.use(express.static('uploads'));

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
    res.sendFile(path.join(__dirname,'\..', 'views', 'upload.html'));
});
router.get('/for', (req, res) => {
    res.send("hi");
});

router.post('/', upload, (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    
    console.log('Upload successful');
    res.send('Upload Success');
});

module.exports = router;
