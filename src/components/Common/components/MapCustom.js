
import React from "react";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  MapConsumer
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "../constants/constants";
//import "./styles.css";

export default function MapCustom({center, zoom, lattitudelongitude}) {
  var x;
  function MyComponent() {
    const map = useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        L.marker([lat, lng], { icon }).addTo(map);
      }
    });
    return null;
  }

  return (
    <MapContainer
      center={[50.5, 30.5]}
      zoom={13}
      style={{ height: "100vh" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapConsumer>
        {(map) => {
          map.on("click", function (e) {
            const { lat, lng } = e.latlng;
            console.log('Marker: ', e.latlng);
            if(x){
                map.removeLayer(x);
            }
            x= L.marker([lat, lng], { icon });
            x.addTo(map);
            lattitudelongitude(e.latlng);
          });
          return null;
        }}
      </MapConsumer>
    </MapContainer>
  );
}
// export default MapCustom;