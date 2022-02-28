const express = require('express');
const fs = require('fs');
const path = require('path');

const api = express.Router();

api.get('/wav', (req, res) => {
  // TODO: Modify logic to read from annotations folder and return audio files and desc(if already annotated)
  let wavFilesPath = "./wav"
  res.send(readDir(wavFilesPath))
})

api.post('/annotations', (req, res) => {
  let annotations = req.body.annotations;
  let chapterName = annotations[0].fileName.split('-')
  let fileName = `${path.join(__dirname, '../../annotations/')}${chapterName[0]}-${chapterName[1]}-${new Date().getTime()}.json`
  
  console.log(`Writing file ${fileName}`);
  
  fs.writeFile(fileName, JSON.stringify(annotations), (err) => {
    if(err) res.send({"err": err})
    else res.send({"success":"Success"});
  });

})

const readDir = (dirPath) => {
  return fs.readdirSync(dirPath)
} 

module.exports = {api};