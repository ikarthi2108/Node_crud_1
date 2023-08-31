// utils/dataUtils.js
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../Data/data.json');

function readData() {
  const data = fs.readFileSync(dataPath, 'utf8');
  return JSON.parse(data);                                //read func which reads the converts the json to js objects
}

function writeData(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));  //write func converts the js obj to json strings
}

module.exports = { readData, writeData }; //exporting to other modules
