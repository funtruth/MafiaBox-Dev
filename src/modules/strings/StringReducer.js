import * as helpers from '../common/helpers'

import { screenType } from './types'

const initialState = {
    stringRepo: {},
    stringView: screenType.dashboard,
    stringKey: '',
}

const NAV_STRING_VIEW = 'string/nav-string-view'
const UPDATE_REPO = 'string/update-repo'

export function stringNavigate(view, key) {
    return (dispatch) => {
        switch(view) {
            case screenType.dashboard:
            case screenType.edit:
                dispatch({
                    type: NAV_STRING_VIEW,
                    payload: {
                        view,
                        key,
                    }
                })
                break
            default:
                console.warn('Screen type does not exist', view)
        }
    }
}

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
        case NAV_STRING_VIEW:
            return { ...state, stringView: action.payload.view, stringKey: action.payload.key }
        case UPDATE_REPO:
            return { ...state, stringRepo: action.payload }
        default:
            return state;
    }
}