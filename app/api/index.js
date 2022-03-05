const express = require('express');
const fs = require('fs');
const path = require('path');

const api = express.Router();

api.get('/:bookName/:chapterName/wavs/:fileName', function (req, res) {
  let chapterName = req.params.chapterName,
    fileName = req.params.fileName,
    bookName = req.params.bookName;
  let filePath = `${bookName}/${chapterName}/wavs/${fileName}`
  let options = {
    root: path.join(__dirname, '../../'),
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  }
  res.sendFile(filePath, options);
});

api.get('/:bookName/:chapterName/wavs', (req, res) => {
  let chapterName = req.params.chapterName,
    bookName = req.params.bookName;
  let wavsFilePath = `${path.join(__dirname, `../../${bookName}/${chapterName}`, 'wavs')}`
  if (fs.existsSync(wavsFilePath)) {
    res.send(readDir(wavsFilePath))
  } else {
    res.send([])
  }
})

api.post('/annotations', (req, res) => {
  let annotations = req.body.annotations;
  let chapterName = annotations[0].fileName.split('-')
  let fileName = `${path.join(__dirname, '../../annotations/')}${chapterName[0]}-${new Date().getTime()}.json`

  console.log(`Writing file ${fileName}`);

  fs.writeFile(fileName, JSON.stringify(annotations), (err) => {
    if (err) res.send({ "err": err })
    else res.send({ "success": "Success" });
  });
})

const readDir = (dirPath) => {
  return fs.readdirSync(dirPath)
}

module.exports = { api };