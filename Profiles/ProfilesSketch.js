
function setup() {
  loadJSON('/userdata',gotData)
  noCanvas();


}
function gotData(response){
  console.log(response);
  var test = select('#welcome');
  test.html("Welcome"+response.usr);

}

