import * as helpers from '../common/helpers'

const initialState = {
    stringRepo: {},
    stringKey: '',
}

const UPDATE_REPO = 'string/update-repo'

export function addString(params={}) {
    return (dispatch, getState) => {
        const { stringRepo } = getState().string
        let repoClone = Object.assign({}, stringRepo)
        const newKey = helpers.genUID('string', stringRepo)

        repoClone[newKey] = {
            ...params,
            key: newKey,
            lastEdit: Date.now(),
        }

        dispatch({
            type: UPDATE_REPO,
            payload: repoClone,
        })
    }
}

export function updateStringByPath(stringKey, object) {
    return (dispatch, getState) => {
        const { stringRepo } = getState().string
        
        let repoClone = Object.assign({}, stringRepo)
        repoClone[stringKey] = {
            ...repoClone[stringKey],
            ...object,
        }

        dispatch({
            type: UPDATE_REPO,
            payload: repoClone,
        })
    }
}

export default (state = initialState, action) => {
    switch(action.type){
        case UPDATE_REPO:
            return { ...state, stringRepo: action.payload }
        default:
            return state;
    }
}