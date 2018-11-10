var express = require('express')
var app = express()
var server=app.listen(3000,listening);
var bodyParser = require('body-parser')


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


//DB
const { Client } = require('pg');
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'diplomna',
  password: '123456',
  port: 5432,
})

client.connect()



var USER=""
app.get('/profile',profile);
function profile(request,response){
    var reply={
        usr: USER
    }
    response.send(reply);
}


app.post('/register',Register);

function Register(request,response){
    console.log(request.body);
    client.query("INSERT INTO registered_users VALUES ('"+request.body.usr+"','"+request.body.pas+"');", (err, res) => {
        if (err) {
          console.log(err.stack)
        } else {
          //console.log(res.rows[0])
    }
    })

}

app.post('/signin',Signin);

function Signin(request,response){
    var respond=false;
    console.log(request.body);
    client.query("SELECT * FROM registered_users ", (err, res) => {
        if (err) {
          console.log(err.stack)
        } else {
          for(var i=0;i<res.rows.length;i++){
            if(res.rows[i].username==request.body.usr && res.rows[i].password==request.body.pas){
                console.log("match")
                var reply={
                    msg: 'sucess',
                    usr: request.body.usr,
                }
                USER=request.body.usr;
                response.send(reply);
                break;


            }else{
                if(i==res.rows.length-1){
                    respond=true;
                    console.log("no match")

                    var reply={
                        msg: 'invalid password/username'
                    }
                    response.send(reply);
                }
            }
          }
    }
    })

    
}


function listening(){

    console.log("Listening...")
  
  }

app.use(express.static("Login_form"));
app.use('/profile' , express.static("Profiles"));

