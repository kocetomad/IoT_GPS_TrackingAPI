

var { Client } = require('pg');
const client = new Client({
  user: 'postgres',
  host: '172.17.0.1',
  database: 'diplomna',
  password: '123456',
  port: 5432,
})
var longt=42.61286406;
var latd=23.358727;

var longt1=42.70786406;
var latd1=23.3398727;
client.connect()

client.query("update devices set longt="+longt+",latd="+latd+" where deviceid=2", (err, res) => {
});
client.query("update devices set longt="+42.70786406+",latd="+23.3398727+" where deviceid=5", (err, res) => {
    //update devices set longt=42.61286406,latd=23.358727 where deviceid=2;
});


setInterval(Simulate, 2000);

function Simulate(){
    longt+=0.001;
    latd+=0.001;
    longt1-=0.001;

    client.query("update devices set longt="+longt+",latd="+latd+" where deviceid=2", (err, res) => {
        //update devices set longt=42.61286406,latd=23.358727 where deviceid=2;
    });
    client.query("update devices set longt="+longt1+",latd="+23.3398727+" where deviceid=5", (err, res) => {
        //update devices set longt=42.61286406,latd=23.358727 where deviceid=2;
    });
}


