const initialState = {
    dropdownKeys: [],
    dropdownParams: {}
}

const SHOW_DROPDOWN_BY_KEY = 'dropdown/show-dropdown-by-key'

export function showDropdownByKey(key, params) {
    return (dispatch, getState) => {
        const { dropdownKeys } = getState().dropdown

        if (!key) {
            dispatch({
                type: SHOW_DROPDOWN_BY_KEY,
                payload: {
                    keys: [],
                    params: {},
                }
            })
        } else {
            let keys = Array.from(dropdownKeys)
            keys.push(key)
            dispatch({
                type: SHOW_DROPDOWN_BY_KEY,
                payload: {
                    keys,
                    params,
                }
            })
        }
        
    }
}

export default (state = initialState, action) => {
    switch(action.type){
        case SHOW_DROPDOWN_BY_KEY:
            return { ...state, dropdownKeys: action.payload.keys, dropdownParams: action.payload.params }
        default:
            return state;
    }
}