import * as helpers from './helpers'

const initialState = {
    roles: [],

    //viewing, updating, creating
    roleId: null,

    showEditRoleView: false,

    roleInfo: {}
}

const TOGGLE_EDIT_ROLE_VIEW = 'library/toggle-add-role-view'
const CLEAN_ROLES = 'library/clean-roles'
const SHOW_ROLE_INFO = 'library/show-role-info'
const UPDATE_ROLE_INFO = 'library/update-role-info'
const SAVE_ROLE_INFO_LOCALLY = 'library/-save-role-info-locally'

export function toggleEditRoleView() {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_EDIT_ROLE_VIEW
        })
    }
}

export function cleanRoles() {
    return (dispatch) => {
        dispatch({
            type: CLEAN_ROLES
        })
    }
}

export function showRoleInfo(obj) {
    return (dispatch) => {
        dispatch({
            type: SHOW_ROLE_INFO,
            payload: obj
        })
    }
}

export function updateRoleInfo(key, value) {
    return (dispatch) => {
        dispatch({
            type: UPDATE_ROLE_INFO,
            payload: {
                key, value
            }
        })
    }
}

export function saveRoleInfo() {
    return (dispatch, getState) => {
        const { library } = getState()
        const { roleInfo } = library

        dispatch({
            type: SAVE_ROLE_INFO_LOCALLY,
            payload: roleInfo,
        })
    }
}

export default (state = initialState, action) => {
    switch(action.type){
        case TOGGLE_EDIT_ROLE_VIEW:
            return { ...state, showEditRoleView: !state.showEditRoleView }
        case CLEAN_ROLES:
            return { ...state, roles: helpers.cleanRoles(state.roles) }
        case SHOW_ROLE_INFO:
            return { ...state, roleInfo: action.payload, roleId: action.payload.roleId }
        case UPDATE_ROLE_INFO:
            return { ...state, roleInfo: { ...state.roleInfo, [action.payload.key]: action.payload.value }}
        case SAVE_ROLE_INFO_LOCALLY:
            return { ...state, roles: helpers.saveRoleInfo(action.payload, state.roles) }
        default:
            return state;
    }
}