
function setup() {
  loadJSON('/userdata',gotData)
  noCanvas();
  Android.anchorMode();


}
function gotData(response){


  if (response.usr!=""){
  document.cookie = "username="+response.usr+";expires=Thu, 01 Jan 2020 00:00:00 UTC; path=/;";
  }

  
  
  var user = document.cookie;
  var user = user.split("=");
  var user = user[1];

  var test = select('#welcome');
  test.html("Welcome "+user+"!");
  if(test.html()=="Welcome undefined!"){
    location.pathname='/';
    console.log(location.pathname);
  }
  Android.getUser(user);

}

