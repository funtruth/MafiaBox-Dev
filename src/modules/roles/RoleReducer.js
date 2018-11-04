import * as helpers from './helpers'

const initialState = {
    //new data architecture
    history: [],

    roles: {},

    roleInfoDefaults: {},
    roleInfoCopy: {},
    roleInfoWorkspace: {},

    gameKey: 'MAF',
}

const CLEAR_ROLE_INFO = 'roles/clear-role-info'
const SHOW_ROLE_INFO = 'roles/show-role-info'
const CREATE_NEW_ROLE = 'roles/create-new-role'
const UPDATE_ROLE_INFO = 'roles/update-role-info'
const SAVE_ROLE_INFO_LOCALLY = 'roles/-save-role-info-locally'
const DELETE_ROLE = 'roles/delete-role'

export function clearRoleInfo() {
    return (dispatch) => {
        dispatch({
            type: CLEAR_ROLE_INFO,
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

export function createNewRole() {
    return(dispatch, getState) => {
        const { roles, roleInfoDefaults, gameKey } = getState().roles

        let uid = helpers.genUID(gameKey)
        while(roles[uid]) {
            uid = helpers.genUID(gameKey)
        }

        dispatch({
            type: CREATE_NEW_ROLE,
            payload: {
                ...roleInfoDefaults,
                roleId: uid,
            }
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
        case CLEAR_ROLE_INFO:
            return { ...state, roleInfoCopy: {}, roleInfoWorkspace: {} }
        case SHOW_ROLE_INFO:
            return { ...state, roleInfoCopy: state.roles[action.payload], roleInfoWorkspace: state.roles[action.payload] }
        case CREATE_NEW_ROLE:
            return { ...state, roleInfoCopy: action.payload, roleInfoWorkspace: action.payload }
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