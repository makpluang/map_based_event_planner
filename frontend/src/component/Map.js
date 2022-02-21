import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getRandomPath } from "../redux/action";

const Map = ({path}) => {

  const [map, setMap] = useState("");
  const dispatch = useDispatch();

  const {start, destination, route} = useSelector(state => state)
  console.log(start, destination, route)

  useEffect(() => {
     dispatch(getRandomPath())
      var centre = new window.L.LatLng(27.1762781, 77.9728989);
      let mapObj = new window.MapmyIndia.Map("map", {
        center: centre,
        zoomControl: true,
        hybrid: true,
      });
      setMap(mapObj);
  }, [dispatch]);

  useEffect(() => {
    if (map) {
      document.getElementById("geo0").click()
      let curr_loc = window.MapmyIndia.current_location.join(",")
      window.MapmyIndia.direction({
        map,
        start: start,
        end: { label: "India Gate, Delhi", geoposition: destination},
        via: path.route.map((loc)=> {
          return  {id: loc._id, label: loc.title, geoposition: `${loc.lattitude},${loc.longitude}`}
         }),
        routeColor: "#0000FF",
        strokeWidth: 10,
        callback: () => console.log,
      });
    }
  }, [map, start, destination, path]);

  return <div className="mapContainer">
  <div id="map"></div>;
  </div>

};

export default Map;