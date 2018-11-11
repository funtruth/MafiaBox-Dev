const initialState = {
    dropdownKey: null,
    dropdownParams: {}
}

const SHOW_DROPDOWN_BY_KEY = 'dropdown/show-dropdown-by-key'

export function showDropdownByKey(key, params) {
    return (dispatch) => {
        dispatch({
            type: SHOW_DROPDOWN_BY_KEY,
            payload: { key, params }
        })
    }
}

export default (state = initialState, action) => {
    switch(action.type){
        case SHOW_DROPDOWN_BY_KEY:
            return { ...state, dropdownKey: action.payload.key, dropdownParams: action.payload.params }
        default:
            return state;
    }
}