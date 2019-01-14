const initialState = {
    dropdownKeys: [],
}

const UPDATE_KEYS = 'dropdown/update-keys'

export function showDropdown(key, e, params={}, index=0) {
    return (dispatch, getState) => {
        const { dropdownKeys } = getState().dropdown
        const { modalKeys } = getState().modal

        if (!key) {
            dispatch({
                type: UPDATE_KEYS,
                payload: [],
            })
        } else {
            let keysClone = Array.from(dropdownKeys).slice(0, index + 1)

            const prev = keysClone[keysClone.length - 1]
            if (keysClone.length) {
                keysClone.push({
                    ...modalKeys[modalKeys.length - 1],
                    ...prev,
                    ...params,
                    pageX: prev.pageX + e.target.offsetWidth,
                    pageY: e.pageY - (e.pageY - prev.pageY - e.target.offsetTop) % e.target.offsetHeight - 8,
                    key,
                })
            } else {
                keysClone.push({
                    ...modalKeys[modalKeys.length - 1],
                    ...prev,
                    ...params,
                    pageX: e.pageX - e.offsetX - 8,
                    pageY: e.pageY - e.offsetY + e.target.offsetHeight,
                    key,
                })
            }

            dispatch({
                type: UPDATE_KEYS,
                payload: keysClone,
            })
        }  
    }
}

export function popDropdownTo(index) {
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