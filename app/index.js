const express = require('express');
const path = require('path')
const {api} = require('./api')

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/js', express.static(path.join(__dirname, '/public/js')))
app.use('/css', express.static(path.join(__dirname, '/public/css')))
app.use('/wav', express.static(path.join(__dirname, '../wav')))

app.use('/api', api);

app.get('/', (req, res) => {
  let options = {
    root: path.join(__dirname, 'public'),
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  }

  res.sendFile('index.html', options)
})

app.listen(PORT, () => console.log(`App started at ${PORT}`))