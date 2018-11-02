var bg;
var pin;
let pinOpp=0;
let OppModifier=1;
let OffsetX;
let OffsetY;
var pinY=random(20,windowWidth-20);
var pinX=random(40,windowHeight-40);
function setup() {
  pin=loadImage("images/pin.png");
  bg = loadImage("images/bck3.png");
  var cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent("Canvas");

  var button = select('#SignButton');
  button.mousePressed(Submit);


}

function draw() {
    tint(255, 255); 
    OffsetX=map(mouseX,0,windowWidth,-10,10);
    OffsetY=map(mouseY,0,windowHeight,-10,10);
    image(bg,-30+OffsetX,-30+OffsetY,windowWidth+100,windowHeight+100);
    Pin();
}

function Pin(){
  if(pinOpp>=255){
    OppModifier=-1;
   

  }
  if(pinOpp<0){
    OppModifier=1;
    pinX=random(20,windowWidth-100);
    pinY=random(40,windowHeight-200);
  }
  pinOpp+=3*OppModifier;
  tint(255, pinOpp); 
  image(pin,pinX+OffsetX,pinY+OffsetY,22,40)
}


function Submit() {
  var usrname=select('#username').value();
  var pass=select('#password').value();
  console.log(usrname,pass);
  var data={
    usr:usrname,
    pas:pass,
  
  }
  httpPost('register/',data,'json');

}