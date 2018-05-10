var express = require('express');
var app = express();
var fs = require('fs');
var port = process.env.PORT || 8000;

app.get('/yourroute', function(req, res) {
  res.send("stuff");
});

// 1
app.post('/create/:name/:age', (req,res) => {
  
  fs.readFile('./stretchStorage.json', 'utf8',(err, data) => {
    if(err) throw err;
    const fileData = JSON.parse(data);
    let id = ++fileData.id_count;
    const userData = {
        name: req.params.name,
        age: req.params.age,
        id: id
    }
    fileData.users[id] = userData;
    fs.writeFile('./stretchStorage.json', JSON.stringify(fileData), () => {
      res.sendStatus(200);
    });
  })
});

// 2
app.get('/', (req,res) => {
  fs.readFile('./stretchStorage.json', 'utf8', (err, data) => {
    let fileData = JSON.parse(data);
    res.send(fileData);
  })
})

// 3
app.get('/:id', (req, res) => {
  fs.readFile('./stretchStorage.json', (err, data) => {
    let fileData = JSON.parse(data);
    if(fileData.users[req.params.id] === undefined) {
      res.sendStatus(400);
    } else {
      res.json(fileData.users[req.params.id]);
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
