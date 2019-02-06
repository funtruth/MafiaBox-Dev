import _ from 'lodash'
import { getCode } from '../logic/LogicReducer'

const initialState = {
    codeKeys: [],
}

const UPDATE_CODE_KEYS = 'code/update-code-keys'

export function pushCode(obj) {
    return (dispatch, getState) => {
        const { codeKeys } = getState().code
        const { pageKey, fieldKey } = obj

        const activeIndex = _.findIndex(codeKeys, i => i.pageKey === pageKey && i.fieldKey === fieldKey)

        let keysClone = Array.from(codeKeys)
        if (activeIndex > -1) {
            keysClone.splice(activeIndex, 1)
        }
        keysClone.push(obj)

        dispatch({
            type: UPDATE_CODE_KEYS,
            payload: keysClone,
        })
    }
}

export function toggleCodeAtIndex(index) {
    return (dispatch, getState) => {
        const { codeKeys } = getState().code

        let keysClone = Array.from(codeKeys)
        keysClone[index].expanded = !keysClone[index].expanded

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

export function updateIfActive(pageKey, fieldKey, origin, value) {
    return (dispatch, getState) => {
        const { codeKeys } = getState().code

        const activeIndex = _.findIndex(codeKeys, i => i.pageKey === pageKey && i.fieldKey === fieldKey)

        if (activeIndex !== -1) {
            let keysClone = Array.from(codeKeys)
            keysClone[activeIndex].code = dispatch(getCode(origin, value))

            dispatch({
                type: UPDATE_CODE_KEYS,
                payload: keysClone,
            })
        }
    }
}

export default (state = initialState, action) => {
    switch(action.type){
        case UPDATE_CODE_KEYS:
            return { ...state, codeKeys: action.payload }
        default:
            return state;
    }
}