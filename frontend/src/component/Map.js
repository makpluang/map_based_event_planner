import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { checkUpcomingPlace, getRandomPath } from "../redux/action";

const Map = () => {

  const [map, setMap] = useState("");
  const dispatch = useDispatch();

  const {start, destination, currIndex, route} = useSelector(state => state)
  // console.log(start, destination, route, "Map component")
  const [userLocation, setUserLocation] = useState();

  const failureCallBack = (error) => {
    console.log("Error ===>", error);
  };

  // setInterval(()=> {
  //   dispatch(checkUpcomingPlace())
  // }, 5000)

  useEffect (()=>{

    const successCallBack = (position) => {
      const { latitude, longitude } = position.coords;
      setUserLocation(latitude+","+longitude);
      console.log(latitude+","+longitude, "map component");
      dispatch(getRandomPath(latitude+","+longitude))
    };

    const options = { frequency: 3000 };

    if (window.navigator.geolocation) {
      window.navigator.geolocation.watchPosition(
        successCallBack,
        failureCallBack,
        options
      );
    }

  },[dispatch])

  useEffect(() => {
    if(route.length){
      var centre = new window.L.LatLng(start.split(",")[0], start.split(",")[1]);
      let mapObj = new window.MapmyIndia.Map("map", {
        center: centre,
        zoomControl: true,
        hybrid: true,
      });
      setMap(mapObj);
      console.log("map load")
    }
  }, [route, start]);

  useEffect(() => {
    if (map) {
      // document.getElementById("geo0").click()
      // let curr_loc = window.MapmyIndia.current_location.join(",")
      window.MapmyIndia.direction({
        map,
        start: start,
        end: { label: "India Gate, Delhi", geoposition: destination},
        via: route.slice(currIndex).map((loc)=> {
          return  {id: loc._id, label: loc.title, geoposition: `${loc.lattitude},${loc.longitude}`}
         }),
        routeColor: "#0000FF",
        strokeWidth: 10,
        callback: () => console.log,
      });
    }
  }, [map, start, destination, route]);

  return <div className="mapContainer">
  <div id="map"></div>;
  </div>

};

export default Map;