import React, { useState, useEffect } from "react";
const Map = ({path}) => {
  const [map, setMap] = useState("");
  useEffect(() => {
      var centre = new window.L.LatLng(27.1762781, 77.9728989);
      let mapObj = new window.MapmyIndia.Map("map", {
        center: centre,
        zoomControl: true,
        hybrid: true,
      });
      setMap(mapObj);
  }, []);
  useEffect(() => {
    if (map) {
      document.getElementById("geo0").click()
      let curr_loc = window.MapmyIndia.current_location.join(",")
      window.MapmyIndia.direction({
        map,
        start: curr_loc,
        end: { label: "India Gate, Delhi", geoposition: "1T182A" },
        via: path.route.map((loc)=> {
          return  {id: loc._id, label: loc.title, geoposition: `${loc.lattitude},${loc.longitude}`}
         }),
        routeColor: "#0000FF",
        strokeWidth: 10,
        callback: () => console.log,
      });
    }
  }, [map, path]);

  return <div className="mapContainer">
  <div id="map"></div>;
  </div>
};
export default Map;