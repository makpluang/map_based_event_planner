import axios from "axios"

import {
    GET_RANDOM_PATH,
    SET_UPCOMING_PLACE
} from "./constant"

const API = "http://localhost:3000/api/"

const setRandomPath = (data, start)=>{
    console.log(start, "action file")
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

export const getRandomPath = (start) => async(dispatch) => {
    const { data } = await axios.get(`${API}paths/pathtofollow/${start}/Mumbai`)
    console.log(data, "action file")
    const route = data.paths.route.map((ele) => {
        return {
            ...ele,
            traversed : false
        }
    })
    return dispatch(setRandomPath(route, start))
}


export const checkUpcomingPlace = () => async(dispatch) => {
    // const { data } = await axios.get(`${API}/distance/Delhi/Mumbai`)

    // console.log(data)
    dispatch(setUpcomingPlace())


}