
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var fs = require('fs');
var https = require('https');
var http = require('http');

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

var httpServer = http.createServer(app);
httpServer.listen(3000,listening);

//DB
var { Client } = require('pg');
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
    console.log(request.body);
    
    client.query(" select * from devices where users='"+request.body.usr+"';", (err, res) => {
        if (err) {
          console.log(err.stack)
        } else {
            client.query("select anchor_latd,anchor_longt from registered_users where username='"+request.body.usr+"';", (err1, res1) => {
                if (err1) {
                  console.log(err1.stack)
                } else {
                    var reply={
                        msg:  res.rows,
                        anchor: res1.rows
                    }
                    //console.log(reply);

                    response.send(reply);

            }
            })
            
                
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



///////////////////////////////////////////////////////END OF DEVICE MANAGMENT SEGMENT///////////////////////////////////////////////

//////////////////////////////////////////////////////ANCHOR GPS HANDLING///////////////////////////////////////////////

app.post('/anchorData',anchorData);

function anchorData(request,response){
    console.log(request.body);

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




//////////////////////////////////////////////////////END OF ANCHOR GPS HANDLING///////////////////////////////////////////////

var socket = require('socket.io');

var io = socket(httpServer,httpsServer);

io.sockets.on('connection', newConnection);

function newConnection(socket) {
  console.log('new connection:' + socket.id);
  socket.on('new message', msg1);
  function msg1(data) {

    var arr = data.split(";").map(function (val) {
    return val;
    });
    arr[0]=Number(arr[0]);
    arr[1]=Number(arr[1]);
    client.query("update registered_users set anchor_latd="+arr[0]+" ,anchor_longt="+arr[1]+" where username='"+arr[2]+"';", (err, res) => {

        if (err) {
          console.log(err.stack)
        
        } else {
           var reply={
                msg: res.rowCount
            }
           // res.send(reply);

            console.log(res);


    }
    })
    //update registered_users set anchor_latd=1,anchor_longt=1 where username='koce';
    console.log(arr);
    //console.log(data);

    }

}




function listening(){

    console.log("Http Listening...")
  
  }


  function httpsListening(){

    console.log("Https Listening...")
  
  }



app.use(express.static("Login_form"));
app.use('/profile' , express.static("Profiles"));
