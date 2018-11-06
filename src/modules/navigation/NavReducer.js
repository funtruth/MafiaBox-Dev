const initialState = {
    path: false,
    lastPath: null,
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

export function goBack() {
    return (dispatch, getState) => {
        let { path } = getState().nav

        let newPath = path.split('/')
        newPath.pop()
        newPath = newPath.join('/')

        dispatch({
            type: REMOTE_NAVIGATION,
            payload: newPath
        })
    }
}

export default (state = initialState, action) => {
    switch(action.type){
        case REMOTE_NAVIGATION:
            return { ...state, path: action.payload, lastPath: state.path }
        default:
            return state;
    }
}