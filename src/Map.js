import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import { API_KEY } from "./utils";
import cat from "./cat.png";

const Cat = () => (
  <img src={cat} style={{ height: "30px", width: "30px" }} alt="cat" />
);

const Map = ({ cats }) => {
  const [mapCenter] = useState({
    // London
    lat: 51.507243,
    lng: -0.101655,
  });

  return (
    <div style={{ height: "80vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: API_KEY }}
        defaultCenter={mapCenter}
        defaultZoom={13}
        distanceToMouse={() => {}}
      >
        {Object.keys(cats).map((cat) => {
          let { lat, lng } = cats[cat];
          return <Cat key={cat} lat={lat} lng={lng} />;
        })}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
