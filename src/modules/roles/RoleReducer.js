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

    roleInfoDefaults: {
        roleStoryKey: 'inProgress',
    },

    gameKey: 'MAF',
}

const CREATE_NEW_ROLE = 'roles/create-new-role'
const UPDATE_ROLE_INFO = 'roles/update-role-info'
const DELETE_ROLE = 'roles/delete-role'

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
    return (dispatch) => {
        dispatch({
            type: UPDATE_ROLE_INFO,
            payload: {
                roleId,
                field,
                value
            }
        })
    }
}

export function deleteRole(roleId) {
    return (dispatch, getState) => {
        let rolesClone = getState().roles.roles
        delete rolesClone[roleId]

        dispatch({
            type: DELETE_ROLE,
            payload: rolesClone
        })
    }
}

export default (state = initialState, action) => {
    switch(action.type){
        case CREATE_NEW_ROLE:
            return { ...state, roles : { ...state.roles, [action.payload.roleId]: action.payload } }
        case UPDATE_ROLE_INFO:
            return { ...state, roles: { ...state.roles,
                [action.payload.roleId]: { ...state.roles[action.payload.roleId], [action.payload.field]: action.payload.value } } }
        case DELETE_ROLE:   
            return { ...state, roles: action.payload }
        default:
            return state;
    }
}