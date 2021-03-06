var express = require('express');
var app = express();
var fs = require('fs');
var port = process.env.PORT || 8000;

app.get('/yourroute', function(req, res) {
  res.send("stuff");
});

// 1
app.post('/create/:name/:age', (req,res) => {
  const userData = {
    name: req.params.name,
    age: req.params.id
  }
  fs.readFile('./storage.json', 'utf8',(err, data) => {
    if(err) throw err;
    const fileData = JSON.parse(data);
    fileData.push(userData);
    fs.writeFile('./storage.json', JSON.stringify(fileData), () => {
      res.sendStatus(200);
    });
  })
});

// 2
app.get('/', (req,res) => {
  fs.readFile('./storage.json', 'utf8', (err, data) => {
    let fileData = JSON.parse(data);
    res.send(fileData);
  })
})

// 3
app.get('/:name', (req, res) => {
  fs.readFile('./storage.json', (err, data) => {
    let fileData = JSON.parse(data);
    let user;
    for(let i = 0; i < fileData.length; i++) {
      if(fileData[i]['name'] === req.params.name) {
        user = fileData[i];
        break;
      }
    }
    if(user === undefined || user === null) {
      res.sendStatus(400);
    } else {
      res.json(user);
    }
  })
})

// 4


app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
