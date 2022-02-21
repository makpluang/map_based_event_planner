import axios from "axios"

export const GET_RANDOM_PATH="GET_RANDOM_PATH"

export const getRandomPath = () =>(dispatch)=>{
    console.log("action called")

    const {data} = axios.get("https://kanhaiyaproj.herokuapp.com/api/paths/pathtofollow/Delhi/Mumbai")
    console.log(data)
    return dispatch({
        type: GET_RANDOM_PATH
    })
}