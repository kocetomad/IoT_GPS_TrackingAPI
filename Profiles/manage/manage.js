var user;
function setup() {
    var button = select('.Send');
    button.mousePressed(Send);
    loadJSON('/userdata',gotData);
    var removeButton=select('.Remove');
    removeButton.mousePressed(Remove);

}


function gotData(response){


    if (response.usr!=""){
    document.cookie = "username="+response.usr+";expires=Thu, 01 Jan 2019 00:00:00 UTC; path=/;";
    }
  
    
    
     user = document.cookie;
     user = user.split("=");
     user = user[1];
  
    var test = select('#welcome');
    test.html(user+"'s"+" device manager");
    if(test.html()=="Welcome undefined!"){
      location.pathname='/';
      console.log(location.pathname);
    }
  }



function Send() {


    
    var deviceID = select('#name').value();
    var comment = select('#comment').value();
    //console.log(deviceID+" "+comment)
      var data={
        id:deviceID,
        com:comment,
        usr:user  
      }
      httpPost("/manageDev",data,'json',success);
    }
  
function Remove(){
    var Label =select('.removeLabel').value();
    var data={
      label:Label,
      usr:user  

    }
    httpPost("/removeDevice",data,'json',success);

}  

  
  function success(response){
    var button = select('#button-blue');

    if (response.msg==0){
      button.value("INVALID DEVICE ID")
    }else{
      button.value("SUCCESSFUL ENTRY")

    }
    console.log(response);
    /*if(response.msg=="sucess"){
      location.href = location.href + "profile"
      }
      var test = select('#validation');
     test.html(response.msg);*/
     
  
  }