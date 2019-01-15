import * as helpers from '../common/helpers'

const initialState = {
    stringRepo: {},
}

const UPDATE_REPO = 'string/update-repo'

export function updateStringByPath() {
    return (dispatch, getState) => {
        const { stringRepo } = getState().string
        
        let repoClone = Object.assign({}, stringRepo)
        repoClone[arguments[0]] = helpers.pathUpdate(arguments, 0, stringRepo)

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