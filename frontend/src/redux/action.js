import axios from "axios"

import {
    GET_RANDOM_PATH,
    SET_UPCOMING_PLACE,
    UPDATE_UPCOMING_DISTANCE
} from "./constant"

const API = "http://localhost:3000/api/"

const setRandomPath = (data, start)=>{
    return {
        type: GET_RANDOM_PATH,
        path: data,
        start
    }
}

const setUpcomingPlace = () =>{
    return{
        type: SET_UPCOMING_PLACE,
    }
}

const updateDistance = (distance) => {
    return {
        type: UPDATE_UPCOMING_DISTANCE ,
        payload: distance
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


export const checkUpcomingPlace = (start, routes, currIndex) => async(dispatch) => {

     console.log(start, routes, currIndex, "action check upcoming place")

    let url = `${API}distance/multi/start/gurgaon/end/`
    routes.slice(currIndex).forEach(pos => {
        url+= `${pos.title}/` 
    });
    
    // console.log()

    const {data} = await axios.get(`${url}`)
    console.log(data, "api response")
    
    let nextPlace = false
    const distances = []
    const distanceArr= data.rows[0].elements
    for (let i =0; i < distanceArr.length; i++){
       console.log(distanceArr[i].distance.text, distanceArr[i].duration.text)
       const dist = Number(distanceArr[i].distance.text.split(" ")[0]) * 1.6
       const duration = distanceArr[i].duration.text
       distances.push({dist, duration })

        if(dist <= 20) nextPlace = true;
    }

    console.log(distances, "distances")

    dispatch(updateDistance(distances))



    if(nextPlace)
        dispatch(setUpcomingPlace())


}