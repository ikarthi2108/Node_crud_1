const express = require("express");// import the express
const path = require("path");
const router = express.Router();
const validateData = require("../middlewares/validator.js"); // import the middleware file used in post
const { readData, writeData } = require("../utils/dataUtils"); // dependent functions
const authRoutes = require("./auth"); // Import the auth route module
const errorHandler = require("../errorhandler.js"); // Import the errorHandler module


// const dataPath = path.join(__dirname, "../data/data.json");

// CRUD
//READ
router.get("/", (req, res) => {
  try {
    const data = readData();
    res.json(data);              // display the data present in json formt
  } catch (error) {
    res.status(500).json({ message: errorHandler.createInternalServerError("Internal server error").message });
  }
});

//create which adds the new user
router.post("/", validateData, (req, res) => {
  try {
    const data = readData();
    const newItem = req.body;                       //route add an new item
    data.push(newItem);
    writeData(data);
    res.status(201).json({ message: "Data added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/:id", (req, res) => {
  try {
    const data = readData();
    const id = parseInt(req.params.id);
  const indexToUpdate = data.findIndex((item) => item.id === id);
    data[indexToUpdate] = { ...data[indexToUpdate], ...req.body }; // the req body obj overwrites the data of the existing object
   writeData(data);
    res.json({ message: "Update successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});


router.delete("/:id", (req, res) => {
  try {
    const data = readData();
    const id = parseInt(req.params.id);  // to delete the item in the json using id
    const indexToDelete = data.findIndex((item) => item.id === id);
    data.splice(indexToDelete, 1)[0]; // remove that particular item
    writeData(data); // add the existing
    res.json({ message: "Deleted successfully" });  
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.use("/auth", authRoutes);  //authuntication routes

module.exports = router;
