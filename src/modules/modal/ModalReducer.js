const initialState = {
    modalKey: null,
    params: null,
}

const SHOW_MODAL_BY_KEY = 'modal/show-modal-by-key'

export function showModalByKey(key, params) {
    return (dispatch) => {
        dispatch({
            type: SHOW_MODAL_BY_KEY,
            payload: {
                key,
                params
            }
        })
    }
}

export default (state = initialState, action) => {
    switch(action.type){
        case SHOW_MODAL_BY_KEY:
            return { ...state, modalKey: action.payload.key, modalParams: action.payload.params }
        default:
            return state;
    }
}