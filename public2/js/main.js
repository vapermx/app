const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const orderid = urlParams.get('orderid');
const moto = urlParams.get('moto');

var map = L.map('map-template').setView([51.505, -0.09], 3);
let motoMarker;

const tileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

const homeIcon = L.icon({
  iconUrl: 'public/img/home_icon.png',
  iconSize: [24, 24],
})

const deliveryIcon = L.icon({
  iconUrl: 'public/img/delivery_icon.png',
  iconSize: [24, 24],
})

const tile = L.tileLayer(tileURL);

/*L.Routing.control({
waypoints: [
   L.latLng(57.74, 11.94),
   L.latLng(57.6792, 11.949) ]
}).addTo(map);*/
// Socket Io


const socket = io.connect();

// Geolocation
map.locate({enableHighAccuracy: true})

if(moto == "true"){
  map.on('locationfound', (e) => {
    map.setView([e.latlng.lat, e.latlng.lng], 14);
    const coords = [e.latlng.lat, e.latlng.lng];
    motoMarker = L.marker(coords,{
      icon: deliveryIcon
    });
    motoMarker.bindPopup('Posicion de reparto!');
    map.addLayer(motoMarker);
    console.log("Iniciamos sala");
    socket.emit('initRoom_Moto', orderid);

    let c_data = {
      orderid: orderid,
      coords: e.latlng
    }
    console.log("Iniciamos moto");
    console.log(c_data);
    socket.emit('sendMotoCoordinates', c_data);

  });
}else{
  socket.emit('initRoom_Home', orderid);
}


socket.on('LoadMap', (c_data) => {
  console.log(c_data);
  map.setView([c_data.coords.lat, c_data.coords.lng], 14);
  const newUserMarker = L.marker([c_data.coords.lat, c_data.coords.lng], {
    icon: homeIcon
  });
  newUserMarker.bindPopup('Repartidor!');
  map.addLayer(newUserMarker);
});

// socket new User connected

socket.on('message', (msg) => {
  console.log(msg);
});

socket.on('error', (msg) => {
  alert(msg);
});

socket.on('NewMotoCoordinates', (coords) => {
  console.log("Nuevas cordenadas de la moto."+ coords);
  motoMarker = L.marker([coords.lat, coords.lng], {
    icon: deliveryIcon
  });
  motoMarker.bindPopup('Repartidor!');
  map.addLayer(motoMarker);
});

socket.on('updateMotoCoordinates', (coords) => {
  console.log("Nuevas cordenadas de la moto."+ coords);

  if(motoMarker == undefined){
    console.log("no esta creado el market");
    motoMarker = L.marker([coords.lat, coords.lng], {
      icon: deliveryIcon
    });
    motoMarker.bindPopup('Repartidor!');
    map.addLayer(motoMarker);
    map.setView(motoMarker.getLatLng(),map.getZoom());
  }else{
    motoMarker.setLatLng(coords);
    map.setView(motoMarker.getLatLng(),map.getZoom());
  }

});

if(moto == "true"){
  setTimeout(function(){

      let c_data = {
        orderid: orderid,
        coords: {
          lat: 19.282434,
          lng: -98.9149567
        }
      }
      socket.emit('sendupdateMotoCoordinates', c_data);

      motoMarker.setLatLng(c_data.coords);
      map.setView(motoMarker.getLatLng(),map.getZoom());

    }, 5000);
}

map.addLayer(tile);
