const initialState = {
    clipboard: {},
}

const COPY_CONTENT = 'logic/copy-content'

export function copyContent(content) {
    return (dispatch) => {
        dispatch({
            type: COPY_CONTENT,
            payload: content,
        })
    }
}

export default (state = initialState, action) => {
    switch(action.type){
        case COPY_CONTENT:
            return { ...state, clipboard: action.payload }
        default:
            return state;
    }
}