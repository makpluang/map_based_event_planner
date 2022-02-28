import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { checkUpcomingPlace, getRandomPath } from "../redux/action";

const Map = () => {

  const [map, setMap] = useState("");
  const dispatch = useDispatch();

  const {start, destination, currIndex, route} = useSelector(state => state)
  const [userLocation, setUserLocation] = useState();

  const failureCallBack = (error) => {
    console.log("Error ===>", error);
  };

  useEffect (()=>{

    const successCallBack = (position) => {
      if(position.coords){
        console.log(position.coords, "position coord ----")
      const { latitude, longitude } = position.coords;
      setUserLocation(latitude+","+longitude);
      console.log(latitude+","+longitude, "watch")
      if(!route.length){
        dispatch(getRandomPath(latitude+","+longitude))
      }  
    }
    };

    if (window.navigator.geolocation) {
      window.navigator.geolocation.watchPosition(
        successCallBack,
        failureCallBack,
      );
    }

  },[dispatch, route.length, map])

  useEffect(() => {
    if(route.length && start){
      console.log(start, " start value")
      var centre = new window.L.LatLng(Number(start.split(",")[0]), Number(start.split(",")[1]));
      let mapObj = new window.MapmyIndia.Map("map", {
        center: centre,
        zoomControl: true,
        hybrid: true,
      });
      setMap(mapObj);

    }
  }, [route, start]);

  useEffect(() => {
    if (map) {
      window.MapmyIndia.direction({
        map,
        start: start,
        end: { label: "Mumbai", geoposition: destination},
        via: route.slice(currIndex).map((loc)=> {
          return  {id: loc._id, label: loc.title, geoposition: `${loc.lattitude},${loc.longitude}`}
         }),
        routeColor: "#0000FF",
        strokeWidth: 10,
        callback: () => console.log,
      });
    }
  }, [map, start, destination, route, currIndex]);


  useEffect (()=>{
    console.log("map use effect")
    if(map){
    document.getElementById("geo0").click()
    // let curr_loc = window.MapmyIndia.current_location.join(",")
    console.log(userLocation, "use effect")
    dispatch(checkUpcomingPlace(start, route, currIndex, userLocation))
    }
  },[map, userLocation, start, currIndex, route, dispatch])


  return <div className="mapContainer">
  <div id="map"></div>;
  </div>

};

export default Map;