const initialState = {
    dropdownKeys: [],
}

const UPDATE_KEYS = 'dropdown/update-keys'

export function showDropdown(key, e, params={}, index=0) {
    return (dispatch, getState) => {
        const { dropdownKeys } = getState().dropdown
        const { modalKeys } = getState().modal

        if (!key) {
            if (!dropdownKeys.length) return

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
                //TODO wrap dropdown in a view with width = parentWidth and then alignItems:'center'
                if (params.centerViewOnParent) {

                } else {
                    let offsetX = 0, offsetY = 0
                    switch(e.type) {
                        case 'click':
                            offsetX = e.offsetX
                            offsetY = e.offsetY
                            break
                        case 'mouseover':
                            offsetX = e.nativeEvent.offsetX
                            offsetY = e.nativeEvent.offsetY
                            break
                        default:
                    }

                    keysClone.push({
                        ...modalKeys[modalKeys.length - 1],
                        ...prev,
                        ...params,
                        pageX: e.pageX - offsetX - 8,
                        pageY: e.pageY - offsetY + e.target.offsetHeight,
                        key,
                    })
                }
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