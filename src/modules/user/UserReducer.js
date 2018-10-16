import { authType } from '../common/types'

const initialState = {
    uid: null,
    authType: authType.pending,
}

const UPDATE_AUTHTYPE = 'user/update-authtype'

export function updateAuthType(auth) {
    return (dispatch) => {
        dispatch({
            type: UPDATE_AUTHTYPE,
            payload: auth
        })
    }
}

export default (state = initialState, action) => {
    switch(action.type){
        case UPDATE_AUTHTYPE:
            return { ...state, authType: action.payload }
        default:
            return state;
    }
}