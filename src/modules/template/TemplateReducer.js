import { dropdownType } from '../dropdown/types'
import { variableType } from '../logic/types'

const initialState = {
    updateRef: {
        'rss': {
            key: 'rss',
            subfield: 'rss',
            dropdown: dropdownType.showSubfields,
            variableTypes: [
                variableType.object,
                variableType.rssObject,
            ],
        },
        'rss_gameState': {
            key: 'rss_gameState',
            subfield: 'gameState',
            dropdown: dropdownType.showSubfields,
            variableTypes: [
                variableType.object.key,
                variableType.rss.key,
            ],
        },
        'rss_gameState_phase': {
            key: 'rss_gameState_phase',
            subfield: 'phase',
            dropdown: dropdownType.pickPhase,
            variableTypes: [
                variableType.string.key,
            ],
        },
        'rss_gameState_counter': {
            key: 'rss_gameState_counter',
            subfield: 'counter',
            dropdown: dropdownType.pickUpdate,
            update: true,
            mutate: false,
            variableTypes: [
                variableType.number.key,
            ],
        },
        'rss_gameState_veto': {
            key: 'rss_gameState_veto',
            subfield: 'veto',
            dropdown: dropdownType.pickUpdate,
            update: true,
            mutate: false,
            variableTypes: [
                variableType.number.key,
            ],
        },
        'rss_gameState_timer': {
            key: 'rss_gameState_timer',
            subfield: 'timer',
            dropdown: dropdownType.pickTimer,
            update: true,
            mutate: false,
            variableTypes: [
                variableType.number.key,
            ],
        },
        'rss_lobby': {
            key: 'rss_lobby',
            subfield: 'lobby',
            dropdown: dropdownType.pickUid,
            variableTypes: [
                variableType.object.key,
                variableType.uidObject.key,
                variableType.rss.key,
            ],
        },
        'rss_lobby_@': {
            key: 'rss_lobby_@',
            subfield: '@',
            dropdown: dropdownType.showSubfields,
            variableTypes: [
                variableType.object.key,
            ],
        },
        'rss_lobby_@_role': {
            key: 'rss_lobby_@_role',
            subfield: 'role',
            dropdown: dropdownType.showSubfields,
            variableTypes: [
                variableType.object.key,
            ],
        },
        'rss_lobby_@_role_roleId': {
            key: 'rss_lobby_@_role_roleId',
            subfield: 'roleId',
            dropdown: dropdownType.pickRole,
            update: true,
            mutate: true,
            variableTypes: [
                variableType.string.key,
            ],
        },
        'rss_lobby_@_role_team': {
            key: 'rss_lobby_@_role_team',
            subfield: 'team',
            dropdown: dropdownType.pickTeam, //TODO
            update: true,
            mutate: true,
            variableTypes: [
                variableType.string.key,
            ],
        },
        'rss_lobby_@_role_action': {
            key: 'rss_lobby_@_role_action',
            subfield: 'action',
            dropdown: dropdownType.pickRole,
            update: true,
            mutate: true,
            variableTypes: [
                variableType.string.key,
            ],
        },
        'rss_lobby_@_role_charges': {
            key: 'rss_lobby_@_role_charges',
            subfield: 'charges',
            dropdown: dropdownType.pickUpdate,
            update: true,
            mutate: false,
            variableTypes: [
                variableType.number.key,
            ],
        },
        'rss_lobby_@_role_suspicious': {
            key: 'rss_lobby_@_role_suspicious',
            subfield: 'suspicious',
            dropdown: dropdownType.pickBoolean,
            update: false,
            mutate: true,
            variableTypes: [
                variableType.boolean.key,
            ],
            tag: true,
        },
        'rss_lobby_@_role_focus': {
            key: 'rss_lobby_@_role_focus',
            subfield: 'focus',
            dropdown: dropdownType.pickBoolean,
            update: false,
            mutate: true,
            variableTypes: [
                variableType.boolean.key,
            ],
            tag: true,
        },
        'rss_lobby_@_role_sneak': {
            key: 'rss_lobby_@_role_sneak',
            subfield: 'sneak',
            dropdown: dropdownType.pickBoolean,
            update: false,
            mutate: true,
            variableTypes: [
                variableType.boolean.key,
            ],
            tag: true,
        },
        'rss_lobby_@_health': {
            key: 'rss_lobby_@_health',
            subfield: 'health',
            dropdown: dropdownType.pickHealth,
            update: true,
            mutate: false,
            variableTypes: [
                variableType.object.key,
            ],
        },
        'rss_lobby_@_dead': {
            key: 'rss_lobby_@_dead',
            subfield: 'dead',
            dropdown: dropdownType.pickBoolean,
            update: true,
            mutate: true,
            variableTypes: [
                variableType.boolean.key,
            ],
        },
        'rss_lobby_@_king': {
            key: 'rss_lobby_@_king',
            subfield: 'king',
            dropdown: dropdownType.pickBoolean,
            update: true,
            mutate: false,
            variableTypes: [
                variableType.boolean.key,
            ],
        },
        'rss_lobby_@_clown': {
            key: 'rss_lobby_@_clown',
            subfield: 'clown',
            dropdown: dropdownType.pickBoolean,
            update: true,
            mutate: false,
            variableTypes: [
                variableType.boolean.key,
            ],
        },
        'rss_lobby_@_trigger': {
            key: 'rss_lobby_@_trigger',
            subfield: 'trigger',
            dropdown: dropdownType.pickUid,
            variableTypes: [
                variableType.object.key,
            ],
        },
        'rss_lobby_@_trigger_@': {
            key: 'rss_lobby_@_trigger_@',
            subfield: '@',
            dropdown: dropdownType.pickTrigger,
            mutate: true,
            variableTypes: [
                variableType.uid.key,
            ],
        },
        'rss_choices': {
            key: 'rss_choices',
            subfield: 'choices',
            dropdown: dropdownType.pickUid,
            variableTypes: [
                variableType.object.key,
                variableType.uidObject.key,
                variableType.rss.key,
            ],
        },
        'rss_choices_@': {
            key: 'rss_choices_@',
            subfield: '@',
            dropdown: dropdownType.showSubfields,
            variableTypes: [
                variableType.object.key,
            ],
        },
        'rss_choices_@_user': {
            key: 'rss_choices_@_user',
            subfield: 'user',
            dropdown: dropdownType.pickUid,
            variableTypes: [
                variableType.uid.key,
            ],
        },
        'rss_choices_@_target': {
            key: 'rss_choices_@_target',
            subfield: 'target',
            dropdown: dropdownType.pickChoice,
            variableTypes: [
                variableType.uid.key,
            ],
        },
        'rss_choices_@_multitarget': {
            key: 'rss_choices_@_multitarget',
            subfield: 'multitarget',
            dropdown: dropdownType.pickUid,
            variableTypes: [
                variableType.object.key,
                variableType.uidObject.key,
            ],
        },
        'rss_choices_@_multitarget_@': {
            key: 'rss_choices_@_multitarget_@',
            subfield: '@',
            dropdown: dropdownType.pickUid,
            variableTypes: [
                variableType.number.key,
            ],
        },
        'rss_choices_@_value': {
            key: 'rss_choices_@_value',
            subfield: 'value',
            dropdown: dropdownType.pickVar,
            variableTypes: [
                variableType.number.key,
            ],
        },
        'rss_events': {
            key: 'rss_events',
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