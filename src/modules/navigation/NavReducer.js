const initialState = {
    path: "/",
    lastPath: "/",
}

const REMOTE_NAVIGATION = 'nav/remote-navigation'
const NAVIGATE_STACK = 'nav/navigate-stack'

export function navigate(path) {
    return (dispatch) => {
        dispatch({
            type: REMOTE_NAVIGATION,
            payload: path
        })
    }
}

export function navigateStack(next) {
    return (dispatch, getState) => {
        let { path } = getState().nav

        let paths = path.split('/')
        if (next === paths[paths.length - 1]) return;
        
        paths.push(next)
        let newPath = paths.join('/')

        dispatch({
            type: NAVIGATE_STACK,
            payload: newPath,
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
            payload: newPath || '/'
        })
    }
}

export default (state = initialState, action) => {
    switch(action.type){
        case REMOTE_NAVIGATION:
        case NAVIGATE_STACK:
            return { ...state, path: action.payload, lastPath: state.path }
        default:
            return state;
    }
}