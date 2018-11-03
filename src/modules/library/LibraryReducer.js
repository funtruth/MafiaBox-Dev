import * as helpers from './helpers'

const initialState = {
    //to be removed
    showEditRoleView: false,

    //new data architecture
    history: [],

    roles: {},

    roleInfoCopy: {},
    roleInfoWorkspace: {},
}

const CREATE_NEW_ROLE = 'library/create-new-role'
const SHOW_ROLE_INFO = 'library/show-role-info'
const UPDATE_ROLE_INFO = 'library/update-role-info'
const SAVE_ROLE_INFO_LOCALLY = 'library/-save-role-info-locally'
const DELETE_ROLE = 'library/delete-role'

export function createNewRole() {
    return (dispatch) => {
        dispatch({
            type: CREATE_NEW_ROLE,
        })
    } 
}

export function showRoleInfo(roleId) {
    return (dispatch) => {
        dispatch({
            type: SHOW_ROLE_INFO,
            payload: roleId
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

export function saveRoleInfoLocally(roleInfo) {
    return (dispatch) => {
        dispatch({
            type: SAVE_ROLE_INFO_LOCALLY,
            payload: roleInfo,
        })
    }
}

export function deleteRole() {
    return (dispatch) => {
        dispatch({
            type: DELETE_ROLE
        })
    }
}

export default (state = initialState, action) => {
    switch(action.type){
        case CREATE_NEW_ROLE:
            return { ...state, roleInfoCopy: {}, roleInfoWorkspace: {}, showEditRoleView: true }
        case SHOW_ROLE_INFO:
            return { ...state, roleInfoCopy: state.roles[action.payload], roleInfoWorkspace: state.roles[action.payload], showEditRoleView: true }
        case UPDATE_ROLE_INFO:
            return { ...state, roleInfoWorkspace: { ...state.roleInfoWorkspace, [action.payload.key]: action.payload.value }}
        case SAVE_ROLE_INFO_LOCALLY:
            return { ...state, roles: { ...state.roles, [action.payload.roleId]: action.payload },
                history: helpers.updateHistory(state.history, action.payload.roleId) }
        case DELETE_ROLE:   
            return { ...state, roleInfoCopy: {}, roleInfoWorkspace: {}, ...helpers.deleteRole(state) }
        default:
            return state;
    }
}