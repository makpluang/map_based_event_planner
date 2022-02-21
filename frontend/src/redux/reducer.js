import {
    GET_RANDOM_PATH,
    SET_UPCOMING_PLACE
} from "./action"

const initialState = {
    start:"",
    destination: "",
    route:[],
    upcomingId: 0,
    currIndex : 0
}

const pathReducer = (state= initialState, action) => {
    switch(action.type){
        case GET_RANDOM_PATH:
        return{
            ...state,
            start: "28.4510342,77.0166822",
            destination: "1T182A",
            route: action.path,
            upcomingId: action.path[state.currIndex]._id
        }

        case SET_UPCOMING_PLACE: {
            const nextIndex = (state.currIndex + 1 < state.route.length) ? state.currIndex + 1 : state.route.length-1
            return {
                ...state,
                currIndex: nextIndex,
                upcomingId: action.path[nextIndex]._id
            }
        }
        default: return state
    }
}

export default pathReducer;