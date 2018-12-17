
function setup() {
    var button = select('.Send');
    button.mousePressed(Send);
    loadJSON('/userdata',gotData)

}


function gotData(response){


    if (response.usr!=""){
    document.cookie = "username="+response.usr+";expires=Thu, 01 Jan 2019 00:00:00 UTC; path=/;";
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
  }



function Send() {




    
    var deviceID = select('#name').value();
    var comment = select('#comment').value();
    //console.log(deviceID+" "+comment)
      var data={
        id:deviceID,
        com:comment
      }
      httpPost("/manageDev",data,'json',success);
    }
  
  

  
  function success(response){
    console.log(response);
    /*if(response.msg=="sucess"){
      location.href = location.href + "profile"
      }
      var test = select('#validation');
     test.html(response.msg);*/
     
  
  }