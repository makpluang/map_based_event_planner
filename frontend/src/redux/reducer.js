import {
    GET_RANDOM_PATH,
    SET_UPCOMING_PLACE,
    UPDATE_UPCOMING_DISTANCE
} from "./constant"

const initialState = {
    start:"",
    destination: "",
    route:[],
    upcomingId: 0,
    currIndex : 0,
    distances:[]
}

const pathReducer = (state= initialState, action) => {
    switch(action.type){
        case GET_RANDOM_PATH: {
            return{
                ...state,
                start: action.start,
                destination: "19.075983,72.877655",
                route: action.path,
                upcomingId: action.path[state.currIndex]._id
            }
    
        }
      
        case SET_UPCOMING_PLACE: {
            const nextIndex = (state.currIndex + 1 < state.route.length) ? state.currIndex + 1 : state.route.length-1
            const newRoute = state.route.map((checkpoint, ind) => {
                return {
                    ...checkpoint,
                    traversed : (ind ===state.currIndex) ? true: checkpoint.traversed
                }
            })
            console.log("set upcoming place", nextIndex)
            return {
                ...state,
                route: newRoute,
                currIndex: nextIndex,
                upcomingId: state.route[nextIndex]._id,
                //start: action.currPosition
            }
        }

        case UPDATE_UPCOMING_DISTANCE: 
        return {
            ...state,
            distances : action.payload,
            //start: action.currPosition
        }

        default: return state
    }
}

export default pathReducer;