import axios from "axios"

import {
    GET_RANDOM_PATH,
    SET_UPCOMING_PLACE,
    UPDATE_UPCOMING_DISTANCE
} from "./constant"

const API = "http://localhost:3000/api/"

const lastPlace = {
    _id : 1,
    lattitude: "19.075983",
    longitude: "72.877655",
    title: "Mumbai",
    about: "Mumbai is home to three UNESCO World Heritage Sites: the Elephanta Caves, Chhatrapati Shivaji Maharaj Terminus, and the city's distinctive ensemble of Victorian and Art Deco buildings designed in the 19th and 20th centuries.",
    rating: 9,
    image: "https://cdn.britannica.com/26/84526-050-45452C37/Gateway-monument-India-entrance-Mumbai-Harbour-coast.jpg",
  }

const setRandomPath = (data, start)=>{
    data.push(lastPlace)
    return {
        type: GET_RANDOM_PATH,
        path: data,
        start
    }
}

const setUpcomingPlace = (location) =>{
    return{
        type: SET_UPCOMING_PLACE,
        currPosition: location
    }
}

const updateDistance = (distance, location) => {
    return {
        type: UPDATE_UPCOMING_DISTANCE ,
        payload: distance,
        currPosition: location
    }
}

export const getRandomPath = (start) => async(dispatch) => {
    const { data } = await axios.get(`${API}paths/pathtofollow/${start}/Mumbai`)
    const route = data.paths.route.map((ele) => {
        return {
            ...ele,
            traversed : false
        }
    })
    return dispatch(setRandomPath(route, start))
}


export const checkUpcomingPlace = (start, routes, currIndex, userLocation) => async(dispatch) => {

    console.log(start, routes, currIndex, "action check upcoming place")
   
    let url = `${API}distance/multi/start/${userLocation}/end/`
    routes.slice(currIndex).forEach(pos => {
        url+= `${pos.title}/` 
    });
    
     console.log(url)

    const {data} = await axios.get(`${url}`)
    
    const distances = []
    const distanceArr= data.rows[0].elements
    for (let i =0; i < distanceArr.length; i++){
       const dist = Number(distanceArr[i].distance.text.split(" ")[0]) * 1.6
       const duration = distanceArr[i].duration.text
       distances.push({dist, duration })

    }

    // console.log(distances)

    dispatch(updateDistance(distances, userLocation))



    if(distances.length >=2 && distances[0].dist > distances[1].dist ){
        dispatch(setUpcomingPlace(userLocation))
    }
        


}