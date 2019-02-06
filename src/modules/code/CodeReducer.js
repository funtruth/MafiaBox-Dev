const initialState = {
    codeActive: true,
    codeExpanded: false,
    code: '',
    codeKeys: [],
}

const CODE_ACTIVE = 'code/code-active'
const CODE_EXPANDED = 'code/code-expanded'

const UPDATE_CODE_KEYS = 'code/update-code-keys'

export function pushCode(obj) {
    return (dispatch, getState) => {
        const { codeKeys } = getState().code

        let keysClone = Array.from(codeKeys)
        keysClone.push(obj)

        dispatch({
            type: UPDATE_CODE_KEYS,
            payload: keysClone,
        })
    }
}

export function updateCodeAtIndex(index, code) {
    return (dispatch, getState) => {
        const { codeKeys } = getState().code

        let keysClone = Array.from(codeKeys)
        keysClone[index].code = code

        dispatch({
            type: UPDATE_CODE_KEYS,
            payload: keysClone,
        })
    }
}

export function removeCodeAtIndex(index) {
    return (dispatch, getState) => {
        const { codeKeys } = getState().code

        let keysClone = Array.from(codeKeys)
        keysClone.splice(index, 1)

        dispatch({
            type: UPDATE_CODE_KEYS,
            payload: keysClone,
        })
    }
}

export default (state = initialState, action) => {
    switch(action.type){
        case CODE_ACTIVE:
            return { ...state, codeActive: action.payload }
        case CODE_EXPANDED:
            return { ...state, codeExpanded: action.payload }
        case UPDATE_CODE_KEYS:
            return { ...state, codeKeys: action.payload }
        default:
            return state;
    }
}