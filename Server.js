var express = require('express')
var app = express()
var server=app.listen(3000,listening);
var bodyParser = require('body-parser')
var fs = require('fs');
var https = require('https');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//SSL CREDS
var privateKey  = fs.readFileSync('https_selfsigned_creds/server.key', 'utf8');
var certificate = fs.readFileSync('https_selfsigned_creds/server.cert', 'utf8');
var credentials = {key: privateKey, cert: certificate};
var httpsServer = https.createServer(credentials, app);
httpsServer.listen(8443,httpsListening);

//DB
const { Client } = require('pg');
const client = new Client({
  user: 'postgres',
  host: '172.17.0.1',
  database: 'diplomna',
  password: '123456',
  port: 5432,
})

client.connect()


USER=""
app.get('/userdata',profile);
function profile(request,response){
  
    var reply={
        usr: USER
    }
    response.send(reply); 
    USER=""
   
}

/////////////////////////////////////////////////USER VALIDATION////////////////////////////////////////////////
app.post('/register',Register);

function Register(request,response){
    console.log(request.body);
    client.query("SELECT * FROM registered_users ", (err, res) => {
        if (err) {
            console.log(err.stack)
        } else {
            for(var i=0;i<res.rows.length;i++){
            if(res.rows[i].username==request.body.usr){
                var reply={
                    msg: 'Username aleready in use',
                }
                response.send(reply);
                break;
            }else{
                if(i==res.rows.length-1){

                client.query("INSERT INTO registered_users VALUES ('"+request.body.usr+"','"+request.body.pas+"');", (err, res) => {
                    if (err) {
                      console.log(err.stack)
                    } else {
                      //console.log(res.rows[0])
                }
                })
                var reply={
                    msg: 'Succesfull registration',
                }
                response.send(reply);
                }
            }   
        }
    }
    })
    

}

app.post('/signin',Signin);

function Signin(request,response){
    //console.log(request.body);
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
////////////////////////////////////////////////////////END OF USER VALIDATION///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////SEND LOCATIONS/////////////////////////////////////////////////

app.post('/locations',locations);
function locations(request,response){
    console.log(request.body.usr);

    client.query(" select * from devices where users='"+request.body.usr+"';", (err, res) => {
        if (err) {
          console.log(err.stack)
        } else {
            var reply={
                msg: res.rows
            }
            console.log(reply);
            response.send(reply);
                
    }
    })
   
}

///////////////////////////////////////////////////////END OF SEND LOCATIONS/////////////////////////////////////////////////

///////////////////////////////////////////////////////DEVICE MANAGMENT SEGMENT////////////////////////////////////////////////
app.post('/manageDev',manage);
function manage(request,response){
    
   // console.log(request.body);
    client.query("select users from devices where deviceid="+request.body.id+";", (err, res) => {
        if (err) {
            console.log(err.stack)
          
          } else {
             
              if(res.rows[0].users==request.body.usr || res.rows[0].users==null || res.rows[0].users==''){
              client.query("update devices set label='"+request.body.com+"',users='"+request.body.usr+"' where deviceid="+request.body.id+";", (err, res) => {

                if (err) {
                  console.log(err.stack)
                
                } else {
                    var reply={
                        msg: res.rowCount
                    }
                    console.log(res);
                    response.send(reply);
        
            }
            })
        }else {
            var reply={
                msg: 0
            }
            response.send(reply);
        }
  
      }
      })
    

    }



app.post('/removeDevice',remove);
function remove(request,response){

    ///TODO
    client.query("update devices set users=null,label=null where label='"+request.body.label+"' and users='"+request.body.usr+"';", (err, res) => {

        if (err) {
          console.log(err.stack)
        
        } else {
            var reply={
                msg: res.rowCount
            }
            console.log(res);
            response.send(reply);

    }
    })

}



///////////////////////////////////////////////////////END OF DEVICE MANAGMENT SEGMENT////////////////////////////////////////////////

function listening(){

    console.log("Http Listening...")
  
  }


  function httpsListening(){

    console.log("Https Listening...")
  
  }



app.use(express.static("Login_form"));
app.use('/profile' , express.static("Profiles"));

