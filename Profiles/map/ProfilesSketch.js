var user;
var map;
var markers=[];
function setup() {
  var styledMapType = new google.maps.StyledMapType(
    [ { "elementType": "geometry", "stylers": [ { "color": "#1d2c4d" } ] }, { "elementType": "labels.text.fill", "stylers": [ { "color": "#8ec3b9" } ] }, { "elementType": "labels.text.stroke", "stylers": [ { "color": "#1a3646" } ] }, { "featureType": "administrative.country", "elementType": "geometry.stroke", "stylers": [ { "color": "#4b6878" } ] }, { "featureType": "administrative.land_parcel", "elementType": "labels.text.fill", "stylers": [ { "color": "#64779e" } ] }, { "featureType": "administrative.province", "elementType": "geometry.stroke", "stylers": [ { "color": "#4b6878" } ] }, { "featureType": "landscape", "stylers": [ { "visibility": "simplified" } ] }, { "featureType": "landscape.man_made", "elementType": "geometry.stroke", "stylers": [ { "color": "#334e87" } ] }, { "featureType": "landscape.natural", "elementType": "geometry", "stylers": [ { "color": "#023e58" } ] }, { "featureType": "poi", "elementType": "geometry", "stylers": [ { "color": "#283d6a" } ] }, { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [ { "color": "#6f9ba5" } ] }, { "featureType": "poi", "elementType": "labels.text.stroke", "stylers": [ { "color": "#1d2c4d" } ] }, { "featureType": "poi.park", "elementType": "geometry.fill", "stylers": [ { "color": "#023e58" } ] }, { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [ { "color": "#3C7680" } ] }, { "featureType": "road", "elementType": "geometry", "stylers": [ { "color": "#304a7d" } ] }, { "featureType": "road", "elementType": "labels.text.fill", "stylers": [ { "color": "#98a5be" } ] }, { "featureType": "road", "elementType": "labels.text.stroke", "stylers": [ { "color": "#1d2c4d" } ] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [ { "color": "#2c6675" } ] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [ { "color": "#255763" } ] }, { "featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [ { "color": "#b0d5ce" } ] }, { "featureType": "road.highway", "elementType": "labels.text.stroke", "stylers": [ { "color": "#023e58" } ] }, { "featureType": "transit", "elementType": "labels.text.fill", "stylers": [ { "color": "#98a5be" } ] }, { "featureType": "transit", "elementType": "labels.text.stroke", "stylers": [ { "color": "#1d2c4d" } ] }, { "featureType": "transit.line", "elementType": "geometry.fill", "stylers": [ { "color": "#283d6a" } ] }, { "featureType": "transit.station", "elementType": "geometry", "stylers": [ { "color": "#3a4762" } ] }, { "featureType": "water", "elementType": "geometry", "stylers": [ { "color": "#0e1626" } ] }, { "featureType": "water", "elementType": "labels.text.fill", "stylers": [ { "color": "#4e6d70" } ] } ],
    {name: 'Styled Map'});

    var uluru = {lat:42.6, lng: 23.3};
 // The map, centered at Uluru
 map = new google.maps.Map(
     document.getElementById('map'), {zoom: 11, center: uluru});
 // The marker, positioned at Uluru
 map.mapTypes.set('styled_map', styledMapType);
 map.setMapTypeId('styled_map');
  loadJSON('/userdata',gotData)
  //noCanvas();
  
  var button = select('#tesst');
  button.mousePressed(TEST);

  Android.anchorModeOff();



 


}
setInterval(TEST, 8000);


function TEST(){

  for(var i=0;i<markers.length;i++){
    markers[i].setMap(null);
  }
  markers = [];

   loadJSON('/userdata',gotData)


}


function gotData(response){
  

  if (response.usr!=""){
  document.cookie = "username="+response.usr+";expires=Thu, 01 Jan 2019 00:00:00 UTC; path=/;";
  }

  
  
   user = document.cookie;
   user = user.split("=");
   user = user[1];

  var test = select('#welcome');
  test.html("Welcome "+user+"!");
  if(test.html()=="Welcome undefined!"){
    location.pathname='/';
   
  }
  var data={
    usr:user
  }
  httpPost("/locations",data,'json',locationData);
}

function locationData(data){
  var styledMapType = new google.maps.StyledMapType(
    [ { "elementType": "geometry", "stylers": [ { "color": "#1d2c4d" } ] }, { "elementType": "labels.text.fill", "stylers": [ { "color": "#8ec3b9" } ] }, { "elementType": "labels.text.stroke", "stylers": [ { "color": "#1a3646" } ] }, { "featureType": "administrative.country", "elementType": "geometry.stroke", "stylers": [ { "color": "#4b6878" } ] }, { "featureType": "administrative.land_parcel", "elementType": "labels.text.fill", "stylers": [ { "color": "#64779e" } ] }, { "featureType": "administrative.province", "elementType": "geometry.stroke", "stylers": [ { "color": "#4b6878" } ] }, { "featureType": "landscape", "stylers": [ { "visibility": "simplified" } ] }, { "featureType": "landscape.man_made", "elementType": "geometry.stroke", "stylers": [ { "color": "#334e87" } ] }, { "featureType": "landscape.natural", "elementType": "geometry", "stylers": [ { "color": "#023e58" } ] }, { "featureType": "poi", "elementType": "geometry", "stylers": [ { "color": "#283d6a" } ] }, { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [ { "color": "#6f9ba5" } ] }, { "featureType": "poi", "elementType": "labels.text.stroke", "stylers": [ { "color": "#1d2c4d" } ] }, { "featureType": "poi.park", "elementType": "geometry.fill", "stylers": [ { "color": "#023e58" } ] }, { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [ { "color": "#3C7680" } ] }, { "featureType": "road", "elementType": "geometry", "stylers": [ { "color": "#304a7d" } ] }, { "featureType": "road", "elementType": "labels.text.fill", "stylers": [ { "color": "#98a5be" } ] }, { "featureType": "road", "elementType": "labels.text.stroke", "stylers": [ { "color": "#1d2c4d" } ] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [ { "color": "#2c6675" } ] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [ { "color": "#255763" } ] }, { "featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [ { "color": "#b0d5ce" } ] }, { "featureType": "road.highway", "elementType": "labels.text.stroke", "stylers": [ { "color": "#023e58" } ] }, { "featureType": "transit", "elementType": "labels.text.fill", "stylers": [ { "color": "#98a5be" } ] }, { "featureType": "transit", "elementType": "labels.text.stroke", "stylers": [ { "color": "#1d2c4d" } ] }, { "featureType": "transit.line", "elementType": "geometry.fill", "stylers": [ { "color": "#283d6a" } ] }, { "featureType": "transit.station", "elementType": "geometry", "stylers": [ { "color": "#3a4762" } ] }, { "featureType": "water", "elementType": "geometry", "stylers": [ { "color": "#0e1626" } ] }, { "featureType": "water", "elementType": "labels.text.fill", "stylers": [ { "color": "#4e6d70" } ] } ],
    {name: 'Styled Map'});


 // The marker, positioned at Uluru
 map.mapTypes.set('styled_map', styledMapType);
 map.setMapTypeId('styled_map');
 for (var i = 0; i < data.msg.length; i++) {
  
  var latLng = new google.maps.LatLng(data.msg[i].longt,data.msg[i].latd);
  marker= new google.maps.Marker({
    icon: {
    url:'pin.png',
    },
    animation: google.maps.Animation.DROP,
    position: latLng,
    map: map,
    title: "device id:"+data.msg[i].deviceid+
    "\n"+"longtitude:"+data.msg[i].longt+
    "\n"+"latitude:"+data.msg[i].latd+
    "\n"+"label:"+data.msg[i].label,
    
   url:"https://www.google.com/maps/dir//"+data.msg[i].longt+","+data.msg[i].latd+"/@"+data.msg[i].longt+","+data.msg[i].latd+""
    
  });
  marker.addListener('click', function() {
   window.location.href = this.url;
  });
  markers.push(marker);
  
  
 
}

var latLng = new google.maps.LatLng(data.anchor[0].anchor_latd,data.anchor[0].anchor_longt);
marker= new google.maps.Marker({
  icon: {
  url:'image.png',
  },
  animation: google.maps.Animation.DROP,
  position: latLng,
  map: map,
  title: "anchor device"+
  "\n"+"longtitude:"+data.anchor[0].anchor_longt+
  "\n"+"latitude:"+data.anchor[0].anchor_latd,
  
 url:"https://www.google.com/maps/dir//"+data.anchor[0].anchor_longt+","+data.anchor[0].anchor_latd+"/@"+data.anchor[0].anchor_longt+","+data.anchor[0].anchor_latd+""
  
});
marker.addListener('click', function() {
 window.location.href = this.url;
});

markers.push(marker);

/**/

}


