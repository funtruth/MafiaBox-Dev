const initialState = {
    dropdownKeys: [],
}

const UPDATE_KEYS = 'dropdown/update-keys'

export function showDropdown(key, e, params={}, index=0) {
    return (dispatch, getState) => {
        const { dropdownKeys } = getState().dropdown

        if (!key) {
            dispatch({
                type: UPDATE_KEYS,
                payload: [],
            })
        } else {
            let keysClone = Array.from(dropdownKeys).slice(0, index + 1)

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
                type: UPDATE_KEYS,
                payload: keysClone,
            })
        }  
    }
}

export function popDropdown(index) {
    return (dispatch, getState) => {
        const { dropdownKeys } = getState().dropdown

        const keysClone = Array.from(dropdownKeys).slice(0, index + 1)

        dispatch({
            type: UPDATE_KEYS,
            payload: keysClone,
        })
    }
}

export default (state = initialState, action) => {
    switch(action.type){
        case UPDATE_KEYS:
            return { ...state, dropdownKeys: action.payload }
        default:
            return state;
    }
}