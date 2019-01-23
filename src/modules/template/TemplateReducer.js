import { dropdownType } from '../dropdown/types'
import { variableType } from '../logic/types'

const initialState = {
    updateRef: {
        'gameState': {
            key: 'gameState',
            subfield: 'gameState',
            dropdown: dropdownType.addUpdateField,
            action: 'Add',
            variableType: variableType.object.key,
        },
        'gameState.phase': {
            key: 'gameState.phase',
            subfield: 'phase',
            dropdown: dropdownType.pickPhase,
            action: 'Select',
            variableType: variableType.string.key,
        },
        'gameState.counter': {
            key: 'gameState.counter',
            subfield: 'counter',
            dropdown: dropdownType.pickUpdate,
            action: 'Select',
            update: true,
            mutate: false,
            variableType: variableType.number.key,
        },
        'gameState.veto': {
            key: 'gameState.veto',
            subfield: 'veto',
            dropdown: dropdownType.pickUpdate,
            action: 'Select',
            update: true,
            mutate: false,
            variableType: variableType.number.key,
        },
        'gameState.nominate': {
            key: 'gameState.nominate',
            subfield: 'nominate',
            dropdown: dropdownType.pickUid,
            action: 'Add',
            variableType: variableType.object.key,
        },
        'gameState.timer': {
            key: 'gameState.timer',
            subfield: 'timer',
            dropdown: dropdownType.pickTimer,
            action: 'Select',
            update: true,
            mutate: false,
            variableType: variableType.number.key,
        },
        'lobby': {
            key: 'lobby',
            subfield: 'lobby',
            dropdown: dropdownType.pickUid,
            action: 'Add',
            variableType: variableType.object.key,
        },
        'lobby.$': {
            key: 'lobby.$',
            subfield: '$',
            dropdown: dropdownType.addUpdateField,
            action: 'Add',
            variableType: variableType.uid.key,
        },
        'lobby.$.$player': {
            key: 'lobby.$.$player',
            subfield: '$player',
            dropdown: dropdownType.addUpdateField,
            action: 'Add',
            variableType: variableType.uid.key,
        },
        'choices': {
            key: 'choices',
            subfield: 'choices',
            dropdown: dropdownType.pickUid,
            action: 'Add',
            variableType: variableType.object.key,
        },
        'choices.$': {
            key: 'choices.$',
            subfield: '$',
            dropdown: dropdownType.pickUid,
            action: 'Add',
            variableType: variableType.uid.key,
        },
        'events': {
            key: 'events',
            subfield: 'events',
            dropdown: dropdownType.pickEvent,
            action: 'Add',
            variableType: variableType.object.key,
        },
    },
    playerRef: {
        'role': {
            key: 'role',
            subfield: 'role',
            dropdown: dropdownType.addUpdateField,
            action: 'Add',
            variableType: variableType.object.key,
        },
        'role.roleId': {
            key: 'role.roleId',
            subfield: 'roleId',
            dropdown: dropdownType.pickRole,
            action: 'Select',
            update: true,
            mutate: true,
            variableType: variableType.string.key,
        },
        'role.charges': {
            key: 'role.charges',
            subfield: 'charges',
            dropdown: dropdownType.pickUpdate,
            action: 'Select',
            update: true,
            mutate: false,
            variableType: variableType.number.key,
        },
        'role.suspicious': {
            key: 'role.suspicious',
            subfield: 'suspicious',
            dropdown: dropdownType.pickBoolean,
            action: 'Select',
            update: false,
            mutate: true,
            variableType: variableType.boolean.key,
            tag: true,
        },
        'role.focus': {
            key: 'role.focus',
            subfield: 'focus',
            dropdown: dropdownType.pickBoolean,
            action: 'Select',
            update: false,
            mutate: true,
            variableType: variableType.boolean.key,
            tag: true,
        },
        'role.sneak': {
            key: 'role.sneak',
            subfield: 'sneak',
            dropdown: dropdownType.pickBoolean,
            action: 'Select',
            update: false,
            mutate: true,
            variableType: variableType.boolean.key,
            tag: true,
        },
        'health': {
            key: 'health',
            subfield: 'health',
            dropdown: dropdownType.pickHealth,
            action: 'Add',
            update: true,
            mutate: false,
            variableType: variableType.object.key,
        },
        'dead': {
            key: 'dead',
            subfield: 'dead',
            dropdown: dropdownType.pickBoolean,
            action: 'Select',
            update: true,
            mutate: true,
            variableType: variableType.boolean,
        },
        'trigger': {
            key: 'trigger',
            subfield: 'trigger',
            dropdown: dropdownType.pickUid,
            action: 'Add',
            variableType: variableType.object.key,
        },
        'trigger.$': {
            key: 'trigger.$',
            subfield: '$',
            dropdown: dropdownType.pickTrigger,
            action: 'Edit',
            mutate: true,
            variableType: variableType.uid.key,
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