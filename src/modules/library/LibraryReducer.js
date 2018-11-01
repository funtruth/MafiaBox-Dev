const initialState = {
    roles: {},
    sortedRoles: [],

    //viewing, updating, creating
    roleId: null,

    showEditRoleView: false,

    roleInfo: {}
}

const TOGGLE_EDIT_ROLE_VIEW = 'library/toggle-add-role-view'
const UPDATE_ROLE_INFO = 'library-update-role-info'

export function toggleEditRoleView() {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_EDIT_ROLE_VIEW
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

export default (state = initialState, action) => {
    switch(action.type){
        case TOGGLE_EDIT_ROLE_VIEW:
            return { ...state, showEditRoleView: !state.showEditRoleView }
        case UPDATE_ROLE_INFO:
            return { ...state, roleInfo: { ...state.roleInfo, [action.payload.key]: action.payload.value }}
        default:
            return state;
    }
}