import * as helpers from './helpers'
import { itemType } from './types'

import { addRoleToStory } from '../story/StoryReducer'

const initialState = {
    fields: [
        {
            key: 'roleId',
            title: 'Unique Role Id',
            type: itemType.blurInput,
        },
        {
            key: 'roleName',
            title: 'Name of Role',
            placeholder: 'Doctor, Detective ...',
            type: itemType.input,
        },
        {
            key: 'roleDesc',
            title: 'Role Description',
            placeholder: 'Describe what the role does ...',
            type: itemType.input,
        },
        {
            key: 'roleTeamType',
            title: 'Unique Role Id',
            type: itemType.tag,
            data: [
                {
                    key: 1,
                    label: 'Mafia',
                    color: 'rgba(235,87,87,1)',
                },
                {
                    key: 2,
                    label: 'Town',
                    color: 'rgba(18,184,134,1)',
                }
            ]
        },
        {
            key: 'roleActionType',
            title: 'Action Target',
            type: itemType.tag,
            data: [
                {
                    key: 1,
                    label: 'Anyone',
                },
                {
                    key: 2,
                    label: 'Town',
                },
                {
                    key: 3,
                    label: 'Mafia',
                },
                {
                    key: 4,
                    label: 'Town',
                },
                {
                    key: 5,
                    label: 'Alive',
                },
                {
                    key: 6,
                    label: 'Dead',
                },
                {
                    key: 7,
                    label: 'Multiple',
                },
            ]
        },
    ],

    roles: {},
    history: [],

    roleInfoDefaults: {
        roleStoryKey: 'inProgress',
    },
    roleInfoCopy: {},
    roleInfoWorkspace: {},

    gameKey: 'MAF',
}

const SHOW_ROLE_INFO = 'roles/show-role-info'
const CREATE_NEW_ROLE = 'roles/create-new-role'
const UPDATE_ROLE_INFO = 'roles/update-role-info'
const SAVE_ROLE_INFO = 'roles/-save-role-info'
const DELETE_ROLE = 'roles/delete-role'

const PUSH_TO_HISTORY = 'roles/push-to-history'

export function showRoleInfo(roleId) {
    return (dispatch) => {
        dispatch({
            type: SHOW_ROLE_INFO,
            payload: roleId
        })
    }
}

export function createNewRole(uid) {
    return(dispatch, getState) => {
        const { roleInfoDefaults } = getState().roles

        dispatch(addRoleToStory(uid, roleInfoDefaults.roleStoryKey))

        dispatch({
            type: CREATE_NEW_ROLE,
            payload: {
                ...roleInfoDefaults,
                roleId: uid,
            }
        })
    }
}

export function updateRoleInfo(roleId, field, value) {
    return (dispatch, getState) => {
        const { history } = getState().roles

        if (roleId !== history[0]) {
            let historyClone = helpers.updateHistory(history, roleId)
            dispatch({
                type: PUSH_TO_HISTORY,
                payload: historyClone
            })
        }

        dispatch({
            type: UPDATE_ROLE_INFO,
            payload: {
                roleId, field, value
            }
        })
    }
}

export function saveRoleInfo(roleInfo) {
    return (dispatch) => {
        dispatch({
            type: SAVE_ROLE_INFO,
            payload: roleInfo,
        })
    }
}

export function deleteRole(roleId) {
    return (dispatch, getState) => {
        let rolesClone = getState().roles
        delete rolesClone[roleId]

        dispatch({
            type: DELETE_ROLE,
            payload: rolesClone
        })
    }
}

export default (state = initialState, action) => {
    switch(action.type){
        case SHOW_ROLE_INFO:
            return { ...state, roleInfoCopy: state.roles[action.payload], roleInfoWorkspace: state.roles[action.payload] }
        case CREATE_NEW_ROLE:
            return { ...state, roles : { ...state.roles, [action.payload.roleId]: action.payload } }
        case UPDATE_ROLE_INFO:
            return { ...state, roles: { ...state.roles,
                [action.payload.roleId]: { ...state.roles[action.payload.roleId], [action.payload.field]: action.payload.value } } }
        case SAVE_ROLE_INFO:
            return { ...state, roles: { ...state.roles, [action.payload.roleId]: action.payload },
                history: helpers.updateHistory(state.history, action.payload.roleId) }
        case PUSH_TO_HISTORY:
            return { ...state, history: action.payload }
        case DELETE_ROLE:   
            return { ...state, roles: action.payload }
        default:
            return state;
    }
}