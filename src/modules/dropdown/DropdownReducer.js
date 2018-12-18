const initialState = {
    dropdownKeys: [],
    dropdownData: null,
}

const SHOW_DROPDOWN_BY_KEY = 'dropdown/show-dropdown-by-key'
const POP_HIGHEST_DROPDOWN = 'dropdown/pop-highest-dropdown'
const PUSH_DATA = 'dropdown/push-data'

export function showDropdownByKey(key, params) {
    return (dispatch, getState) => {
        const { dropdownKeys } = getState().dropdown

        if (!key) {
            dispatch({
                type: SHOW_DROPDOWN_BY_KEY,
                payload: [],
            })
        } else {
            let keysClone = Array.from(dropdownKeys)

            for (var i=0; i<keysClone.length; i++) {
                if (keysClone[i].key === key) {
                    keysClone = keysClone.slice(0, i)
                    break
                }
            }
            keysClone.push({ key, dropdownParams: params })

            dispatch({
                type: SHOW_DROPDOWN_BY_KEY,
                payload: keysClone,
            })
        }  
    }
}

export function popHighestDropdown() {
    return (dispatch, getState) => {
        const { dropdownKeys } = getState().dropdown

        let keys = Array.from(dropdownKeys)
        keys.pop()

        dispatch({
            type: POP_HIGHEST_DROPDOWN,
            payload: keys
        })
    }
}

export function pushData(obj) {
    return (dispatch) => {
        dispatch({
            type: PUSH_DATA,
            payload: obj
        })
    }
}

export default (state = initialState, action) => {
    switch(action.type){
        case SHOW_DROPDOWN_BY_KEY:
        case POP_HIGHEST_DROPDOWN:
            return { ...state, dropdownKeys: action.payload }
        case PUSH_DATA:
            return { ...state, dropdownData: action.payload }
        default:
            return state;
    }
}