import {
    GET_RANDOM_PATH,
    SET_UPCOMING_PLACE
} from "./constant"

const initialState = {
    start:"",
    destination: "",
    route:[],
    upcomingId: 0,
    currIndex : 0
}

const pathReducer = (state= initialState, action) => {
    switch(action.type){
        case GET_RANDOM_PATH: {
            console.log(action.start)
            return{
                ...state,
                start: action.start,
                destination: "1T182A",
                route: action.path,
                upcomingId: action.path[state.currIndex]._id
            }
    
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