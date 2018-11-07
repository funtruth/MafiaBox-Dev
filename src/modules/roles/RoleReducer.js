import * as helpers from './helpers'
import { itemType } from './types'
import { pathKey } from '../navigation/paths'

import { addRoleToStory } from '../story/StoryReducer'
import { navigate } from '../navigation/NavReducer'

const initialState = {
    fields: [
        {
            key: 'roleId',
            label: 'Unique Role Id',
            type: itemType.blurInput,
        },
        {
            key: 'roleName',
            label: 'Name of Role',
            placeholder: 'Doctor, Detective ...',
            type: itemType.input,
        },
        {
            key: 'roleDesc',
            label: 'Role Description',
            placeholder: 'Describe what the role does ...',
            type: itemType.input,
        },
        {
            key: 'roleTeamType',
            label: 'Role Alliance',
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
            label: 'Action Target',
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

    gameKey: 'MAF',
}

const CREATE_NEW_ROLE = 'roles/create-new-role'
const UPDATE_ROLE_INFO = 'roles/update-role-info'
const SET_ROLE_TO_DEFAULT = 'roles/set-role-to-default'
const DELETE_ROLE = 'roles/delete-role'

export function createNewRole(roleInfo = {}) {
    return(dispatch, getState) => {
        const { defaultInfo } = getState().roleCard
        const { gameKey, roles } = getState().roles

        let uid = helpers.genUID(gameKey)
        while(roles[uid]) {
            uid = helpers.genUID(gameKey)
        }

        dispatch(navigate(`/${pathKey.board}/${uid}`))

        dispatch(addRoleToStory(uid, roleInfo.roleStoryKey || 'inProgress'))

        dispatch({
            type: CREATE_NEW_ROLE,
            payload: {
                ...defaultInfo,
                ...roleInfo,
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

export function setRoleIdToDefault(roleId) {
    return (dispatch, getState) => {
        const { defaultInfo } = getState().roleCard
        const { roles } = getState().roles

        let roleInfo = {
            ...roles[roleId],
            ...defaultInfo
        }
        
        dispatch({
            type: SET_ROLE_TO_DEFAULT,
            payload: {
                roleId,
                roleInfo
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
        case SET_ROLE_TO_DEFAULT:
            return { ...state, roles: { ...state.roles, [action.payload.roleId]: action.payload.roleInfo } }
        case DELETE_ROLE:   
            return { ...state, roles: action.payload }
        default:
            return state;
    }
}