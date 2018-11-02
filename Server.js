var express = require('express')
var app = express()
var server=app.listen(3000,listening);
var bodyParser = require('body-parser')


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.post('/register',Register);

function Register(request,response){
    console.log(request.body);
}


function listening(){

    console.log("Listening...")
  
  }

app.use(express.static("Login_form"));


