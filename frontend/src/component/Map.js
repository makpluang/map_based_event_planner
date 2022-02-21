import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";

import { getRandomPath, GET_RANDOM_PATH } from "../redux/action";

const Map = ({path}) => {

  const [map, setMap] = useState("");
  const dispatch = useDispatch();

  const store = useStore()
  console.log(store.getState(), "Map store")

  const state = useSelector(state => {
    console.log(state, "selector")
    return state
  })
  console.log(state)

  const {start, destination, route} = useSelector(state => state)
  console.log(start, destination, route, "Map component")

  useEffect (()=>{

    const dispatchAction = async() =>{
      const res = await getRandomPath()
      console.log(res, "api data")
   
      dispatch({
       type: GET_RANDOM_PATH,
       path: res
       })
      }

      dispatchAction()

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
      // console.log(map, start, destination, route)
      // document.getElementById("geo0").click()
      // let curr_loc = window.MapmyIndia.current_location.join(",")
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
  }, [map, start, destination, path]);

  return <div className="mapContainer">
  <div id="map"></div>;
  </div>

};

export default Map;