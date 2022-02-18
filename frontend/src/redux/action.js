export const GET_RANDOM_PATH="GET_RANDOM_PATH"

export const getRandomPath = () =>(dispatch)=>{
    console.log("action called")
    return dispatch({
        type: GET_RANDOM_PATH
    })
}