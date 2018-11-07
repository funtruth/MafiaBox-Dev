const initialState = {
    defaultInfo: {
    },
    gameKey: 'MAF',
}

const UPDATE_DEFAULT_INFO = 'roles/update-default-info'

export function updateDefaultInfo(field, value) {
    return (dispatch) => {
        dispatch({
            type: UPDATE_DEFAULT_INFO,
            payload: {
                field,
                value
            }
        })
    }
}

export default (state = initialState, action) => {
    switch(action.type){
        case UPDATE_DEFAULT_INFO:
            return { ...state, defaultInfo: { ...state.defaultInfo, [action.payload.field]: action.payload.value } }
        default:
            return state;
    }
}