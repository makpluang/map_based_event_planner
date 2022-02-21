import {
    GET_RANDOM_PATH
} from "./action"

const initialState = {
    start:"",
    destination: "",
    route:[]
}

const pathReducer = (state= initialState, action) => {
    switch(action.type){
        case GET_RANDOM_PATH: return{
            ...state,
            start: "28.4510342,77.0166822",
            destination: "1T182A"
        }
        default: return state
    }
}

export default pathReducer;