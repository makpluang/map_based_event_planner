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

  // const getLiveLocation = () => {
  //   document.getElementById("geo0").click()
  //   let curr_loc = window.MapmyIndia.current_location.join(",")
  //    setInterval(()=> {
  //   dispatch(checkUpcomingPlace())
  // }, 5000)
  // }

  const checkCurrentLoc = () => {
    // setInterval(()=> {
      document.getElementById("geo0").click()
      let curr_loc = window.MapmyIndia.current_location.join(",")
      setUserLocation(curr_loc)
      let currentdate = new Date();
      console.log(curr_loc, currentdate.getSeconds())
      dispatch(checkUpcomingPlace(start, route, currIndex))
 // }, 100000)
  }

  useEffect (()=>{

    const successCallBack = (position) => {
      const { latitude, longitude } = position.coords;
      setUserLocation(latitude+","+longitude);
      dispatch(getRandomPath(latitude+","+longitude))
    };

    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        successCallBack,
        failureCallBack,
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

    }
  }, [route, start]);

  useEffect(() => {
    if (map) {
      checkCurrentLoc()
      window.MapmyIndia.direction({
        map,
        start: start,
        end: { label: "India Gate, Delhi", geoposition: destination},
        via: route.map((loc)=> {
          return  {id: loc._id, label: loc.title, geoposition: `${loc.lattitude},${loc.longitude}`}
         }),
        routeColor: "#0000FF",
        strokeWidth: 10,
        callback: () => console.log,
      });
    }
  }, [map, start, destination, route, currIndex]);

  return <div className="mapContainer">
  <div id="map"></div>;
  </div>

};

export default Map;