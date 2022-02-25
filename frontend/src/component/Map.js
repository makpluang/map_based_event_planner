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

  let count = 1

  useEffect (()=>{

    const successCallBack = (position) => {
      const { latitude, longitude } = position.coords;
      setUserLocation(latitude+","+longitude);
      console.log(latitude+","+longitude, "watch")
      //let curr_loc = latitude+","+longitude
      // if(map){
      //   document.getElementById("geo0").click()
      //   curr_loc = window.MapmyIndia.current_location.join(",")
      // }
      
      // console.log(count++, "trigger distance calculation")
      // dispatch(checkUpcomingPlace(start, route, currIndex, curr_loc))
      if(!route.length){
        dispatch(getRandomPath(latitude+","+longitude))
      }  
    };

    if (window.navigator.geolocation) {
      window.navigator.geolocation.watchPosition(
        successCallBack,
        failureCallBack,
      );
    }

  },[dispatch, route.length, currIndex, start, route, count, map, userLocation])

  useEffect(() => {
    if(route.length){
      console.log(route)
      var centre = new window.L.LatLng(start.split(",")[0], start.split(",")[1]);
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
    if(map){
    document.getElementById("geo0").click()
   let curr_loc = window.MapmyIndia.current_location.join(",")
    dispatch(checkUpcomingPlace(start, route, currIndex, curr_loc))
    }
  },[map, userLocation, start, currIndex, route, dispatch])

  // useEffect (()=>{
  //   if(map){
  //       document.getElementById("geo0").click()
  //       let curr_loc = window.MapmyIndia.current_location.join(",")
  //       //setUserLocation(curr_loc)
  //       console.log(count++, "trigger distance calculation")
  //       dispatch(checkUpcomingPlace(start, route, currIndex, curr_loc))
  //   }
  // }, [map, userLocation, currIndex, start, route, dispatch, count])

  return <div className="mapContainer">
  <div id="map"></div>;
  </div>

};

export default Map;