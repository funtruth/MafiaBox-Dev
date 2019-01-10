const initialState = {
    modalKeys: [],
}

const UPDATE_MODAL_KEYS = 'modal/update-modal-keys'

export function showModal(key, params={}) {
    return (dispatch, getState) => {
        const { modalKeys } = getState().modal
        let keysClone = Array.from(modalKeys)

        if (!key) {
            keysClone.pop()
        } else {
            if (keysClone.length) {
                keysClone.push({
                    ...keysClone[keysClone.length - 1],
                    key,
                    ...params,
                })
            } else {
                keysClone.push({
                    key,
                    ...params,
                })
            }
        }
        
        dispatch({
            type: UPDATE_MODAL_KEYS,
            payload: keysClone
        })
    }
}

export default (state = initialState, action) => {
    switch(action.type){
        case UPDATE_MODAL_KEYS:
            return { ...state, modalKeys: action.payload }
        default:
            return state;
    }
}