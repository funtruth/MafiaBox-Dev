import _ from 'lodash'

const initialState = {
    prefs: {},
}

export const PREF_KEY = {
    PATCH_HEADER_TAB: 'patch-header-tab',
    EDIT_PRIO_SWITCH: 'edit-prio-switch',
}

const SET_PREF = 'app/set-preference'

export function setPref(key, value) {
    return (dispatch, getState) => {
        const { prefs } = getState().app

        const prefsClone = _.cloneDeep(prefs)
        prefsClone[key] = value

        dispatch({
            type: SET_PREF,
            payload: prefsClone,
        })
    }
}

export default (state = initialState, action) => {
    switch(action.type){
        case SET_PREF:
            return { ...state, prefs: action.payload }
        default:
            return state;
    }
}