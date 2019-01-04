const initialState = {
    dropdownKeys: [],
}

const SHOW_DROPDOWN_BY_KEY = 'dropdown/show-dropdown-by-key'
const POP_HIGHEST_DROPDOWN = 'dropdown/pop-highest-dropdown'

export function showDropdownByKey(key, e, params={}) {
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

            if (keysClone.length) {
                let prev = keysClone[keysClone.length - 1]
                keysClone.push({
                    ...prev,
                    key,
                    ...params,
                    pageX: prev.pageX + e.target.offsetWidth,
                    pageY: e.pageY - (e.pageY - prev.pageY - e.target.offsetTop) % e.target.offsetHeight - 8,
                })
            } else {
                keysClone.push({
                    key,
                    ...params,
                    pageX: e.pageX - e.offsetX - 8,
                    pageY: e.pageY - e.offsetY + e.target.offsetHeight,
                })
            }

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

export default (state = initialState, action) => {
    switch(action.type){
        case SHOW_DROPDOWN_BY_KEY:
        case POP_HIGHEST_DROPDOWN:
            return { ...state, dropdownKeys: action.payload }
        default:
            return state;
    }
}