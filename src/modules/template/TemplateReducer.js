import { dropdownType } from '../dropdown/types'
import { variableType } from '../logic/types'

const initialState = {
    updateRef: {
        '(rss)': {
            key: '(rss)',
            subfield: 'rss',
            fields: [
                'rss',
            ],
            fieldLength: 1,
            dropdown: dropdownType.showSubfields,
            variableTypes: [
                variableType.object,
                variableType.rssObject,
            ],
        },
        '(rss)(gameState)': {
            key: '(rss)(gameState)',
            subfield: 'gameState',
            fields: [
                'rss',
                'gameState',
            ],
            fieldLength: 2,
            dropdown: dropdownType.showSubfields,
            variableTypes: [
                variableType.object.key,
                variableType.rss.key,
            ],
        },
        '(rss)(gameState)(phase)': {
            key: '(rss)(gameState)(phase)',
            subfield: 'phase',
            fields: [
                'rss',
                'gameState',
                'phase',
            ],
            fieldLength: 3,
            dropdown: dropdownType.pickPhase,
            variableTypes: [
                variableType.string.key,
            ],
        },
        '(rss)(gameState)(counter)': {
            key: '(rss)(gameState)(counter)',
            subfield: 'counter',
            fields: [
                'rss',
                'gameState',
                'counter',
            ],
            fieldLength: 3,
            dropdown: dropdownType.pickNumUpdate,
            variableTypes: [
                variableType.number.key,
            ],
        },
        '(rss)(gameState)(veto)': {
            key: '(rss)(gameState)(veto)',
            subfield: 'veto',
            fields: [
                'rss',
                'gameState',
                'veto',
            ],
            fieldLength: 3,
            dropdown: dropdownType.pickNumUpdate,
            variableTypes: [
                variableType.number.key,
            ],
        },
        '(rss)(gameState)(timer)': {
            key: '(rss)(gameState)(timer)',
            subfield: 'timer',
            fields: [
                'rss',
                'gameState',
                'timer',
            ],
            fieldLength: 3,
            dropdown: dropdownType.pickTimer,
            variableTypes: [
                variableType.number.key,
            ],
        },
        '(rss)(lobby)': {
            key: '(rss)(lobby)',
            subfield: 'lobby',
            fields: [
                'rss',
                'lobby',
            ],
            fieldLength: 2,
            dropdown: dropdownType.pickUid,
            variableTypes: [
                variableType.object.key,
                variableType.uidObject.key,
                variableType.rss.key,
            ],
        },
        '(rss)(lobby)(@)': {
            key: '(rss)(lobby)(@)',
            subfield: '@',
            fields: [
                'rss',
                'lobby',
                '@',
            ],
            fieldLength: 3,
            dropdown: dropdownType.showSubfields,
            variableTypes: [
                variableType.object.key,
            ],
        },
        '(rss)(lobby)(@)(role)': {
            key: '(rss)(lobby)(@)(role)',
            subfield: 'role',
            fields: [
                'rss',
                'lobby',
                '@',
                'role',
            ],
            fieldLength: 4,
            dropdown: dropdownType.showSubfields,
            variableTypes: [
                variableType.object.key,
            ],
        },
        '(rss)(lobby)(@)(role)(roleId)': {
            key: '(rss)(lobby)(@)(role)(roleId)',
            subfield: 'roleId',
            fields: [
                'rss',
                'lobby',
                '@',
                'role',
                'roleId',
            ],
            fieldLength: 5,
            dropdown: dropdownType.pickRole,
            variableTypes: [
                variableType.string.key,
            ],
        },
        '(rss)(lobby)(@)(role)(team)': {
            key: '(rss)(lobby)(@)(role)(team)',
            subfield: 'team',
            fields: [
                'rss',
                'lobby',
                '@',
                'role',
                'team',
            ],
            fieldLength: 5,
            dropdown: dropdownType.pickTeam, //TODO
            variableTypes: [
                variableType.string.key,
            ],
        },
        '(rss)(lobby)(@)(role)(action)': {
            key: '(rss)(lobby)(@)(role)(action)',
            subfield: 'action',
            fields: [
                'rss',
                'lobby',
                '@',
                'role',
                'action',
            ],
            fieldLength: 5,
            dropdown: dropdownType.pickRole,
            variableTypes: [
                variableType.string.key,
            ],
        },
        '(rss)(lobby)(@)(role)(charges)': {
            key: '(rss)(lobby)(@)(role)(charges)',
            subfield: 'charges',
            fields: [
                'rss',
                'lobby',
                '@',
                'role',
                'team',
            ],
            fieldLength: 5,
            dropdown: dropdownType.pickNumUpdate,
            variableTypes: [
                variableType.number.key,
            ],
        },
        '(rss)(lobby)(@)(role)(suspicious)': {
            key: '(rss)(lobby)(@)(role)(suspicious)',
            subfield: 'suspicious',
            fields: [
                'rss',
                'lobby',
                '@',
                'role',
                'suspicious',
            ],
            fieldLength: 5,
            dropdown: dropdownType.pickBoolean,
            variableTypes: [
                variableType.boolean.key,
            ],
            tag: true,
        },
        '(rss)(lobby)(@)(role)(focus)': {
            key: '(rss)(lobby)(@)(role)(focus)',
            subfield: 'focus',
            fields: [
                'rss',
                'lobby',
                '@',
                'role',
                'focus',
            ],
            fieldLength: 5,
            dropdown: dropdownType.pickBoolean,
            variableTypes: [
                variableType.boolean.key,
            ],
            tag: true,
        },
        '(rss)(lobby)(@)(role)(sneak)': {
            key: '(rss)(lobby)(@)(role)(sneak)',
            subfield: 'sneak',
            fields: [
                'rss',
                'lobby',
                '@',
                'role',
                'sneak',
            ],
            fieldLength: 5,
            dropdown: dropdownType.pickBoolean,
            variableTypes: [
                variableType.boolean.key,
            ],
            tag: true,
        },
        '(rss)(lobby)(@)(health)': {
            key: '(rss)(lobby)(@)(health)',
            subfield: 'health',
            fields: [
                'rss',
                'lobby',
                '@',
                'health',
            ],
            fieldLength: 4,
            dropdown: dropdownType.pickHealth,
            variableTypes: [
                variableType.object.key,
            ],
        },
        '(rss)(lobby)(@)(dead)': {
            key: '(rss)(lobby)(@)(dead)',
            subfield: 'dead',
            fields: [
                'rss',
                'lobby',
                '@',
                'dead',
            ],
            fieldLength: 4,
            dropdown: dropdownType.pickBoolean,
            variableTypes: [
                variableType.boolean.key,
            ],
        },
        '(rss)(lobby)(@)(king)': {
            key: '(rss)(lobby)(@)(king)',
            subfield: 'king',
            fields: [
                'rss',
                'lobby',
                '@',
                'king',
            ],
            fieldLength: 4,
            dropdown: dropdownType.pickBoolean,
            variableTypes: [
                variableType.boolean.key,
            ],
        },
        '(rss)(lobby)(@)(clown)': {
            key: '(rss)(lobby)(@)(clown)',
            subfield: 'clown',
            fields: [
                'rss',
                'lobby',
                '@',
                'clown',
            ],
            fieldLength: 4,
            dropdown: dropdownType.pickBoolean,
            variableTypes: [
                variableType.boolean.key,
            ],
        },
        '(rss)(lobby)(@)(trigger)': {
            key: '(rss)(lobby)(@)(trigger)',
            subfield: 'trigger',
            fields: [
                'rss',
                'lobby',
                '@',
                'trigger',
            ],
            fieldLength: 4,
            dropdown: dropdownType.pickUid,
            variableTypes: [
                variableType.object.key,
            ],
        },
        '(rss)(lobby)(@)(trigger)(@)': {
            key: '(rss)(lobby)(@)(trigger)(@)',
            subfield: '@',
            fields: [
                'rss',
                'lobby',
                '@',
                'trigger',
                '@',
            ],
            fieldLength: 5,
            dropdown: dropdownType.pickTrigger,
            variableTypes: [
                variableType.uid.key,
            ],
        },
        '(rss)(choices)': {
            key: '(rss)(choices)',
            subfield: 'choices',
            fields: [
                'rss',
                'choices',
            ],
            fieldLength: 2,
            dropdown: dropdownType.pickUid,
            variableTypes: [
                variableType.object.key,
                variableType.uidObject.key,
                variableType.rss.key,
            ],
        },
        '(rss)(choices)(@)': {
            key: '(rss)(choices)(@)',
            subfield: '@',
            fields: [
                'rss',
                'choices',
                '@',
            ],
            fieldLength: 3,
            dropdown: dropdownType.showSubfields,
            variableTypes: [
                variableType.object.key,
            ],
        },
        '(rss)(choices)(@)(user)': {
            key: '(rss)(choices)(@)(user)',
            subfield: 'user',
            fields: [
                'rss',
                'choices',
                '@',
                'user',
            ],
            fieldLength: 4,
            dropdown: dropdownType.pickUid,
            variableTypes: [
                variableType.uid.key,
            ],
        },
        '(rss)(choices)(@)(target)': {
            key: '(rss)(choices)(@)(target)',
            subfield: 'target',
            fields: [
                'rss',
                'choices',
                '@',
                'target',
            ],
            fieldLength: 4,
            dropdown: dropdownType.pickChoice,
            variableTypes: [
                variableType.uid.key,
            ],
        },
        '(rss)(choices)(@)(multitarget)': {
            key: '(rss)(choices)(@)(multitarget)',
            subfield: 'multitarget',
            fields: [
                'rss',
                'choices',
                '@',
                'multitarget',
            ],
            fieldLength: 4,
            dropdown: dropdownType.pickUid,
            variableTypes: [
                variableType.object.key,
                variableType.uidObject.key,
            ],
        },
        '(rss)(choices)(@)(multitarget)(@)': {
            key: '(rss)(choices)(@)(multitarget)(@)',
            subfield: '@',
            fields: [
                'rss',
                'choices',
                '@',
                'multitarget',
                '@',
            ],
            fieldLength: 5,
            dropdown: dropdownType.pickUid,
            variableTypes: [
                variableType.number.key,
            ],
        },
        '(rss)(choices)(@)(value)': {
            key: '(rss)(choices)(@)(value)',
            subfield: 'value',
            fields: [
                'rss',
                'choices',
                '@',
                'value',
            ],
            fieldLength: 4,
            dropdown: dropdownType.pickVar,
            variableTypes: [
                variableType.number.key,
            ],
        },
        '(rss)(events)': {
            key: '(rss)(events)',
            subfield: 'events',
            fields: [
                'rss',
                'events',
            ],
            fieldLength: 2,
            dropdown: dropdownType.pickEvent,
            variableTypes: [
                variableType.object.key,
                variableType.rss.key,
            ],
        },
    },
}

export default (state = initialState, action) => {
    switch(action.type){
        default:
            return state;
    }
}