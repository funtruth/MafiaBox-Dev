import { dropdownType } from '../dropdown/types'
import { variableType } from '../logic/types'

const initialState = {
    updateRef: {
        'gameState': {
            key: 'gameState',
            subfield: 'gameState',
            dropdown: dropdownType.showSubfields,
            variableTypes: [
                variableType.object.key,
                variableType.rss.key,
            ],
        },
        'gameState.phase': {
            key: 'gameState.phase',
            subfield: 'phase',
            dropdown: dropdownType.pickPhase,
            variableTypes: [
                variableType.string.key,
            ],
        },
        'gameState.counter': {
            key: 'gameState.counter',
            subfield: 'counter',
            dropdown: dropdownType.pickUpdate,
            update: true,
            mutate: false,
            variableTypes: [
                variableType.number.key,
            ],
        },
        'gameState.veto': {
            key: 'gameState.veto',
            subfield: 'veto',
            dropdown: dropdownType.pickUpdate,
            update: true,
            mutate: false,
            variableTypes: [
                variableType.number.key,
            ],
        },
        'gameState.timer': {
            key: 'gameState.timer',
            subfield: 'timer',
            dropdown: dropdownType.pickTimer,
            update: true,
            mutate: false,
            variableTypes: [
                variableType.number.key,
            ],
        },
        'lobby': {
            key: 'lobby',
            subfield: 'lobby',
            dropdown: dropdownType.pickUid,
            variableTypes: [
                variableType.object.key,
                variableType.rss.key,
                variableType.uidObject.key,
            ],
        },
        'lobby.$': {
            key: 'lobby.$',
            subfield: '$',
            dropdown: dropdownType.showSubfields,
            variableTypes: [
                variableType.uid.key,
            ],
        },
        'lobby.$.role': {
            key: 'lobby.$.role',
            subfield: 'role',
            dropdown: dropdownType.showSubfields,
            variableTypes: [
                variableType.object.key,
            ],
        },
        'lobby.$.role.roleId': {
            key: 'lobby.$.role.roleId',
            subfield: 'roleId',
            dropdown: dropdownType.pickRole,
            update: true,
            mutate: true,
            variableTypes: [
                variableType.string.key,
            ],
        },
        'lobby.$.role.team': {
            key: 'lobby.$.role.team',
            subfield: 'team',
            dropdown: dropdownType.pickTeam, //TODO
            update: true,
            mutate: true,
            variableTypes: [
                variableType.string.key,
            ],
        },
        'lobby.$.role.action': {
            key: 'lobby.$.role.action',
            subfield: 'action',
            dropdown: dropdownType.pickRole,
            update: true,
            mutate: true,
            variableTypes: [
                variableType.string.key,
            ],
        },
        'lobby.$.role.charges': {
            key: 'lobby.$.role.charges',
            subfield: 'charges',
            dropdown: dropdownType.pickUpdate,
            update: true,
            mutate: false,
            variableTypes: [
                variableType.number.key,
            ],
        },
        'lobby.$.role.suspicious': {
            key: 'lobby.$.role.suspicious',
            subfield: 'suspicious',
            dropdown: dropdownType.pickBoolean,
            update: false,
            mutate: true,
            variableTypes: [
                variableType.boolean.key,
            ],
            tag: true,
        },
        'lobby.$.role.focus': {
            key: 'lobby.$.role.focus',
            subfield: 'focus',
            dropdown: dropdownType.pickBoolean,
            update: false,
            mutate: true,
            variableTypes: [
                variableType.boolean.key,
            ],
            tag: true,
        },
        'lobby.$.role.sneak': {
            key: 'lobby.$.role.sneak',
            subfield: 'sneak',
            dropdown: dropdownType.pickBoolean,
            update: false,
            mutate: true,
            variableTypes: [
                variableType.boolean.key,
            ],
            tag: true,
        },
        'lobby.$.health': {
            key: 'lobby.$.health',
            subfield: 'health',
            dropdown: dropdownType.pickHealth,
            update: true,
            mutate: false,
            variableTypes: [
                variableType.object.key,
            ],
        },
        'lobby.$.dead': {
            key: 'lobby.$.dead',
            subfield: 'dead',
            dropdown: dropdownType.pickBoolean,
            update: true,
            mutate: true,
            variableTypes: [
                variableType.boolean.key,
            ],
        },
        'lobby.$.king': {
            key: 'lobby.$.king',
            subfield: 'king',
            dropdown: dropdownType.pickBoolean,
            update: true,
            mutate: false,
            variableTypes: [
                variableType.boolean.key,
            ],
        },
        'lobby.$.clown': {
            key: 'lobby.$.clown',
            subfield: 'clown',
            dropdown: dropdownType.pickBoolean,
            update: true,
            mutate: false,
            variableTypes: [
                variableType.boolean.key,
            ],
        },
        'lobby.$.trigger': {
            key: 'lobby.$.trigger',
            subfield: 'trigger',
            dropdown: dropdownType.pickUid,
            variableTypes: [
                variableType.object.key,
            ],
        },
        'lobby.$.trigger.$': {
            key: 'lobby.$.trigger.$',
            subfield: '$',
            dropdown: dropdownType.pickTrigger,
            mutate: true,
            variableTypes: [
                variableType.uid.key,
            ],
        },
        'choices': {
            key: 'choices',
            subfield: 'choices',
            dropdown: dropdownType.pickUid,
            variableTypes: [
                variableType.object.key,
                variableType.rss.key,
            ],
        },
        'choices.$': {
            key: 'choices.$',
            subfield: '$',
            dropdown: dropdownType.showSubfields,
            variableTypes: [
                variableType.uid.key,
            ],
        },
        'choices.$.user': {
            key: 'choices.$.user',
            subfield: 'user',
            dropdown: dropdownType.pickUid,
            variableTypes: [
                variableType.uid.key,
            ],
        },
        'choices.$.target': {
            key: 'choices.$.target',
            subfield: 'target',
            dropdown: dropdownType.pickChoice,
            variableTypes: [
                variableType.uid.key,
            ],
        },
        'choices.$.multitarget': {
            key: 'choices.$.multitarget',
            subfield: 'multitarget',
            dropdown: dropdownType.pickUid,
            variableTypes: [
                variableType.object.key,
                variableType.uidObject.key,
            ],
        },
        'choices.$.multitarget.$': {
            key: 'choices.$.multitarget.$',
            subfield: '$',
            dropdown: dropdownType.pickUid,
            variableTypes: [
                variableType.number.key,
            ],
        },
        'choices.$.value': {
            key: 'choices.$.value',
            subfield: 'value',
            dropdown: dropdownType.pickVar,
            variableTypes: [
                variableType.number.key,
            ],
        },
        'events': {
            key: 'events',
            subfield: 'events',
            dropdown: dropdownType.pickEvent,
            variableTypes: [
                variableType.object.key,
                variableType.rss.key,
            ],
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