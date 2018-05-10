var express = require('express');
var app = express();
const fs = require('fs');
var port = process.env.PORT || 8000;

app.get('/yourroute', function(req, res) {
  res.send("stuff");
});

// 1
app.get('/hello', (req,res) => {
  res.send('Hello!');
})

// 2
app.post('/create/:name', (req,res) => {
  let data = {
    id: 1,
    name: req.params.name
  };
  res.json(data)
});

// 3
app.get('/', (req, res) => {
  fs.readFile('./part1/index.html', 'utf8',  (err,data) => {
    res.send(data);
  })
})

// 4
app.get('/verify/:age', (req, res) => {
  if(req.params.age > 13) {
    res.sendStatus(200);
  } else {
    res.sendStatus(403);
  }
})

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
