import _ from 'lodash'

const initialState = {
    modalKeys: [],
}

const UPDATE_MODAL_KEYS = 'modal/update-modal-keys'

export function showModal(key, params={}) {
    return (dispatch, getState) => {
        const { modalKeys } = getState().modal
        const { dropdownKeys } = getState().dropdown

        let keysClone = _.cloneDeep(modalKeys)

        if (!key) {
            keysClone.pop()
        } else {
            keysClone.push({
                ...keysClone[keysClone.length - 1],
                ...dropdownKeys[dropdownKeys.length - 1],
                ...params,
                key,
            })
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