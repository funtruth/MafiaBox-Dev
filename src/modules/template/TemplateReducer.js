import { dropdownType } from '../dropdown/types'
import { variableType } from '../logic/types'

const initialState = {
    updateRef: {
        'gameState': {
            key: 'gameState',
            subfield: 'gameState',
            dropdown: dropdownType.showSubfields,
            variableType: variableType.object.key,
        },
        'gameState.phase': {
            key: 'gameState.phase',
            subfield: 'phase',
            dropdown: dropdownType.pickPhase,
            variableType: variableType.string.key,
        },
        'gameState.counter': {
            key: 'gameState.counter',
            subfield: 'counter',
            dropdown: dropdownType.pickUpdate,
            update: true,
            mutate: false,
            variableType: variableType.number.key,
        },
        'gameState.veto': {
            key: 'gameState.veto',
            subfield: 'veto',
            dropdown: dropdownType.pickUpdate,
            update: true,
            mutate: false,
            variableType: variableType.number.key,
        },
        'gameState.timer': {
            key: 'gameState.timer',
            subfield: 'timer',
            dropdown: dropdownType.pickTimer,
            update: true,
            mutate: false,
            variableType: variableType.number.key,
        },
        'lobby': {
            key: 'lobby',
            subfield: 'lobby',
            dropdown: dropdownType.pickUid,
            variableType: variableType.object.key,
        },
        'lobby.$': {
            key: 'lobby.$',
            subfield: '$',
            dropdown: dropdownType.showSubfields,
            variableType: variableType.uid.key,
        },
        'lobby.$.$player': {
            key: 'lobby.$.$player',
            subfield: '$player',
            dropdown: dropdownType.showSubfields,
            variableType: variableType.uid.key,
        },
        'choices': {
            key: 'choices',
            subfield: 'choices',
            dropdown: dropdownType.pickUid,
            variableType: variableType.object.key,
        },
        'choices.$': {
            key: 'choices.$',
            subfield: '$',
            dropdown: dropdownType.showSubfields,
            variableType: variableType.uid.key,
        },
        'choices.$.user': {
            key: 'choices.$.user',
            subfield: 'user',
            dropdown: dropdownType.pickUid,
            variableType: variableType.uid.key,
        },
        'choices.$.target': {
            key: 'choices.$.target',
            subfield: 'target',
            dropdown: dropdownType.pickUid,
            variableType: variableType.uid.key,
        },
        'choices.$.multitarget': {
            key: 'choices.$.multitarget',
            subfield: 'multitarget',
            dropdown: dropdownType.pickUid,
            variableType: variableType.uid.key,
        },
        'choices.$.multitarget.$': {
            key: 'choices.$.multitarget.$',
            subfield: '$',
            dropdown: dropdownType.pickUid,
            variableType: variableType.number.key,
        },
        'choices.$.value': {
            key: 'choices.$.value',
            subfield: 'value',
            dropdown: dropdownType.pickVar,
            variableType: variableType.any.key,
        },
        'events': {
            key: 'events',
            subfield: 'events',
            dropdown: dropdownType.pickEvent,
            variableType: variableType.object.key,
        },
    },
    playerRef: {
        'role': {
            key: 'role',
            subfield: 'role',
            dropdown: dropdownType.showSubfields,
            variableType: variableType.object.key,
        },
        'role.roleId': {
            key: 'role.roleId',
            subfield: 'roleId',
            dropdown: dropdownType.pickRole,
            update: true,
            mutate: true,
            variableType: variableType.string.key,
        },
        'role.action': {
            key: 'role.action',
            subfield: 'action',
            dropdown: dropdownType.pickRole,
            update: true,
            mutate: true,
            variableType: variableType.string.key,
        },
        'role.charges': {
            key: 'role.charges',
            subfield: 'charges',
            dropdown: dropdownType.pickUpdate,
            update: true,
            mutate: false,
            variableType: variableType.number.key,
        },
        'role.suspicious': {
            key: 'role.suspicious',
            subfield: 'suspicious',
            dropdown: dropdownType.pickBoolean,
            update: false,
            mutate: true,
            variableType: variableType.boolean.key,
            tag: true,
        },
        'role.focus': {
            key: 'role.focus',
            subfield: 'focus',
            dropdown: dropdownType.pickBoolean,
            update: false,
            mutate: true,
            variableType: variableType.boolean.key,
            tag: true,
        },
        'role.sneak': {
            key: 'role.sneak',
            subfield: 'sneak',
            dropdown: dropdownType.pickBoolean,
            update: false,
            mutate: true,
            variableType: variableType.boolean.key,
            tag: true,
        },
        'health': {
            key: 'health',
            subfield: 'health',
            dropdown: dropdownType.pickHealth,
            update: true,
            mutate: false,
            variableType: variableType.object.key,
        },
        'dead': {
            key: 'dead',
            subfield: 'dead',
            dropdown: dropdownType.pickBoolean,
            update: true,
            mutate: true,
            variableType: variableType.boolean.key,
        },
        'king': {
            key: 'king',
            subfield: 'king',
            dropdown: dropdownType.pickBoolean,
            update: true,
            mutate: false,
            variableType: variableType.boolean.key,
        },
        'clown': {
            key: 'clown',
            subfield: 'clown',
            dropdown: dropdownType.pickBoolean,
            update: true,
            mutate: false,
            variableType: variableType.boolean.key,
        },
        'trigger': {
            key: 'trigger',
            subfield: 'trigger',
            dropdown: dropdownType.pickUid,
            variableType: variableType.object.key,
        },
        'trigger.$': {
            key: 'trigger.$',
            subfield: '$',
            dropdown: dropdownType.pickTrigger,
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