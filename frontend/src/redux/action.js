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

export const getRandomPath = (start) => async(dispatch) => {
    const { data } = await axios.get(`${API}paths/pathtofollow/${start}/Mumbai`)
    console.log(data, "action file")
    return dispatch(setRandomPath(data.paths.route, start))
}


export const checkUpcomingPlace = () => async(dispatch) => {
    const { data } = await axios.get(`${API}/distance/Delhi/Mumbai`)
    // return dispatch ({
    //     type: SET_UPCOMING_PLACE
    // })

    console.log(data)


}