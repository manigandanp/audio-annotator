const express = require('express');
const app = express();

const multer = require('multer');


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

app.get('/titles', (req, res) => {
  res.send('hello world');
});

const upload = multer({ storage: storage }).single("file");


app.post("/titles", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err)
      res.status(400).send("Something went wrong!");
    }
    res.send(req.file);
  });
});


app.listen(3000, () => {
  console.log('Started on port 3000');
});