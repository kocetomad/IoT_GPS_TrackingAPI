var user;
function setup() {
    var removeButton=select('.Remove');
    removeButton.mousePressed(Remove);
    var button = select('.Send');
    button.mousePressed(Send);
    loadJSON('/userdata',gotData);
    Android.anchorModeOff();

    

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
  console.log("pepega");
    var Label=select('#comment2').value();
    var data={
      label:Label,
      usr:user  

    }
    httpPost("/removeDevice",data,'json',deleSuccess);

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

  function deleSuccess(response){
    var button = select('#button-blue2');

    if (response.msg==0){
      button.value("INVALID DEVICE LABEL")
    }else{
      button.value("SUCCESSFUL DELETION")

    }
    console.log(response);
    /*if(response.msg=="sucess"){
      location.href = location.href + "profile"
      }
      var test = select('#validation');
     test.html(response.msg);*/
     
  
  }