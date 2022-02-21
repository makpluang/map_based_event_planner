import axios from "axios"

export const GET_RANDOM_PATH="GET_RANDOM_PATH"
export const SET_UPCOMING_PLACE="SET_UPCOMING_PLACE"


export const getRandomPath = async() => {
    const { data } = await axios.get("http://localhost:3000/api/paths/pathtofollow/Delhi/Mumbai")
    console.log(data, "action file")
    return data.paths.route
}

export const checkUpcomingPlace = async() => {
    
}