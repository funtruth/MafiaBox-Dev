const initialState = {
    roles: {},
    sortedRoles: [],

    //viewing, updating, creating
    roleId: null,

    showAddRoleView: false,

    newRoleInfo: {}
}

const TOGGLE_ADD_ROLE_VIEW = 'library/toggle-add-role-view'
const UPDATE_ROLE_INFO = 'library-update-role-info'

export function toggleAddRoleView() {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_ADD_ROLE_VIEW
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
        case TOGGLE_ADD_ROLE_VIEW:
            return { ...state, showAddRoleView: !state.showAddRoleView }
        case UPDATE_ROLE_INFO:
            return { ...state, newRoleInfo: { ...state.newRoleInfo, [action.payload.key]: action.payload.value }}
        default:
            return state;
    }
}