// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

// my code, above is the FCC setup
// if the string is empty
app.get("/api/timestamp", (req, res) => {
  res.json({unix: Date.now(), utc: Date()});
})

app.get("/api/timestamp/:input", (req, res) => {
  var userInput = req.params.input;
  var regexCheck = /\d{5,}/g;
  
//   valid dates under ISO format have 4 digits, any more than that it's Unix
  if(regexCheck.test(userInput)){
    let userInt = parseInt(userInput, 10);
    res.json({unix: userInput, utc: new Date(userInt).toUTCString()});
  }
  
  var userDate = new Date(userInput);
//   if the date input was invalid, the toString method should yield invalid date as a return value
  if(userDate.toString() === "Invalid Date"){
    res.json({unix: "Invalid Date", utc: "Invalid Date"});
  }else{
    res.json({unix: userDate.valueOf(), utc: userDate.toUTCString()});
  }
  
})