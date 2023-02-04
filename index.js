
let map;
let service;
let infowindow;
let garageName = "Parking Garage";
let permit;
let building = "none";
let lot = "none";
let markers = [];


let vab = {
  garages : ["Parking Garage I", "Parking Garage I", "Parking Garage I"],
  lots : ["H2 parking", "H2 Parking", "H4 Parking UCF"],
  //d : 'H4 parking',
  //b : 'H2 parking',
  //c : 'H2 parking',
};

let eng2 = {
  garages : ["Parking Garage C" , " Parking Garage C" , "Parking Garage C"],
  lots: ["C1 Parking" , "C1 Parking", "D2 Parking"],  
};


//0 = B 1 = C 2 = D



function initMap() {
  const sydney = new google.maps.LatLng(28.602965, -81.197324);

  infowindow = new google.maps.InfoWindow();
  map = new google.maps.Map(document.getElementById("map"), {
    center: sydney,
    zoom: 15
  });
  map.setMapTypeId('hybrid');
  

  service = new google.maps.places.PlacesService(map);
  /*service.nearbySearch(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK && results) {
      console.log(results.length);
      for (let i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }

      map.setCenter(results[0].geometry.location);
    }
  });*/
}

function createMarker(place) {
  if (!place.geometry || !place.geometry.location) return;
  console.log("a result!\n");
  const marker = new google.maps.Marker({
    map,
    position: place.geometry.location,
  });

  google.maps.event.addListener(marker, "click", () => {
    infowindow.setContent(place.name || "");
    infowindow.open(map);
  });
}

function printButton(){
 console.log()
}

window.initMap = initMap;

function nearestGarage(){
  initMap();
    if(building == "vab"){
        request = {
            query: vab.garages[permit],
            fields: ['name', 'geometry']
        }
    }
    if(building == "eng2"){
        request = {
            query: eng2.garages[permit],
            fields: ['name', 'geometry'],
        }
    }   
    service.findPlaceFromQuery(request, function(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
          map.setCenter(results[0].geometry.location);
          map.setZoom(17);
        }
      });
}

function nearestLot(){
  initMap();
  if(building == "vab"){
      request = {
          query: vab.lots[permit],
          fields: ['name', 'geometry']
      }
  }
  if(building == "eng2"){
      request = {
          query: eng2.lots[permit],
          fields: ['name', 'geometry'],
      }
  }   
  service.findPlaceFromQuery(request, function(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          createMarker(results[i]);
        }
        map.setCenter(results[0].geometry.location);
        map.setZoom(17);
      }
    });
}
function setPermit(x){
    permit = x;
    console.log("Permit changed to "+x);
}

function setBuilding(y){
    building = y;
    console.log("Building changed to "+y);
}
