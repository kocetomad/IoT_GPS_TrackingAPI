
function setup() {
  loadJSON('/userdata',gotData)
  noCanvas();



}
function gotData(response){


  if (response.usr!=""){
  document.cookie = "username="+response.usr+";expires=Thu, 01 Jan 2019 00:00:00 UTC; path=/;";
  }
  console.log(user);

  
  
  var user = document.cookie;
  var user = user.split("=");
  var user = user[1];

  var test = select('#welcome');
  test.html("Welcome "+user);
  if(test.html()=="Welcome undefined"){
    location.pathname='/';
    console.log(location.pathname);
  }
}

