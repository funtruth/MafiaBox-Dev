import { dropdownType } from '../dropdown/types'
import { variableType } from '../logic/types'

const initialState = {
    updateRef: {
        'gameState': {
            dropdown: dropdownType.addUpdateField,
            action: 'Add',
            variableType: variableType.object.key,
        },
        'gameState.phase': {
            dropdown: dropdownType.pickPhase,
            action: 'Select',
            variableType: variableType.string.key,
        },
        'gameState.counter': {
            dropdown: dropdownType.pickUpdate,
            action: 'Select',
            update: true,
            mutate: false,
            variableType: variableType.number.key,
        },
        'gameState.veto': {
            dropdown: dropdownType.pickUpdate,
            action: 'Select',
            update: true,
            mutate: false,
            variableType: variableType.number.key,
        },
        'gameState.nominate': {
            dropdown: dropdownType.pickUid,
            action: 'Add',
            variableType: variableType.object.key,
        },
        'gameState.nominate.$': {
            hideButton: true,
            variableType: variableType.uid.key,
        },
        'lobby': {
            dropdown: dropdownType.pickUid,
            action: 'Add',
            updatable: true,
            transient: true,
            variableType: variableType.object.key,
        },
        'lobby.$': {
            dropdown: dropdownType.addUpdateField,
            action: 'Add',
            variableType: variableType.uid.key,
        },
        'lobby.$.$player': {
            dropdown: dropdownType.addUpdateField,
            action: 'Add',
            variableType: variableType.uid.key,
        },
        'choices': {
            dropdown: dropdownType.pickUid,
            action: 'Add',
            updatable: true,
            transient: true,
            variableType: variableType.object.key,
        },
        'choices.$': {
            dropdown: dropdownType.pickUid,
            action: 'Add',
            variableType: variableType.uid.key,
        },
        'choices.$.$': {
            hideButton: true,
            variableType: variableType.uid.key,
        },
        'events': {
            dropdown: dropdownType.writeNews,
            action: 'Add',
            updatable: true,
            variableType: variableType.object.key,
        },
    },
    playerRef: {
        'role': {
            dropdown: dropdownType.addUpdateField,
            action: 'Add',
            variableType: variableType.object.key,
        },
        'role.roleId': {
            dropdown: dropdownType.pickRole,
            action: 'Select',
            updatable: true,
            transient: true,
            variableType: variableType.string.key,
        },
        'role.suspicious': {
            dropdown: dropdownType.pickBoolean,
            action: 'Select',
            update: false,
            mutate: true,
            variableType: variableType.boolean.key,
        },
        'role.trigger': {
            dropdown: dropdownType.pickBoolean,
            action: 'Select',
            update: false,
            mutate: true,
            variableType: variableType.boolean.key,
        },
        'health': {
            dropdown: dropdownType.pickUid,
            action: 'Add',
            updatable: true,
            variableType: variableType.object.key,
        },
        'health.$': {
            dropdown: dropdownType.pickHealth,
            action: 'Select',
            update: true,
            mutate: false,
            variableType: variableType.uid.key,
        },
        'dead': {
            dropdown: dropdownType.pickBoolean,
            action: 'Select',
            update: true,
            mutate: true,
            variableType: variableType.boolean,
        },
    },
    update: false,
    mutate: false,
}

const INIT_UPDATE_TYPE = 'template/init-update-type'
const TOGGLE_UPDATE_TYPE = 'template/toggle-update-type'

export function initUpdateType(types) {
    return (dispatch, getState) => {
        const template = getState().template

        let updates = {}
        for (var key in types) {
            if (key in template) {
                updates[key] = types[key]
            }
        }

        dispatch({
            type: INIT_UPDATE_TYPE,
            payload: updates,
        })
    }
}

export function toggleUpdateType(type) {
    return (dispatch) => {
        switch(type) {
            case 'update':
            case 'mutate':
                dispatch({
                    type: TOGGLE_UPDATE_TYPE,
                    payload: type
                })
                break
            default:
        }

    }
}

export default (state = initialState, action) => {
    switch(action.type){
        case INIT_UPDATE_TYPE:  
            return { ...state, ...action.payload }
        case TOGGLE_UPDATE_TYPE:
            return { ...state, [action.payload]: !state[action.payload] }
        default:
            return state;
    }
}