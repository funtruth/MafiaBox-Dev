const initialState = {
    path: false,
}

const REMOTE_NAVIGATION = 'nav/remote-navigation'

export function navigate(path) {
    return (dispatch) => {
        dispatch({
            type: REMOTE_NAVIGATION,
            payload: path
        })
    }
}

export default (state = initialState, action) => {
    switch(action.type){
        case REMOTE_NAVIGATION:
            return { ...state, path: action.payload }
        default:
            return state;
    }
}