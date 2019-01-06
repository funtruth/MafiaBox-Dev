import { dropdownType } from '../dropdown/types'

const initialState = {
    updateRefs: {
        'gameState': {
            dropdown: dropdownType.addUpdateField,
            action: 'Add',
        },
        'gameState.phase': {
            dropdown: dropdownType.pickPhase,
            action: 'Select',
        },
        'gameState.counter': {
            dropdown: dropdownType.pickUpdate,
            action: 'Select',
        },
        'gameState.veto': {
            dropdown: dropdownType.pickUpdate,
            action: 'Select',
        },
        'gameState.nominate': {
            dropdown: dropdownType.pickUid,
            action: 'Add',
        },
        'gameState.nominate.$': {
            dropdown: dropdownType.pickUpdate,
            action: 'Add',
            hideButton: true,
        },
        'lobby': {
            dropdown: dropdownType.pickUid,
            action: 'Add',
        },
        'lobby.$': {
            dropdown: dropdownType.addUpdateField,
            action: 'Add',
        },
        'lobby.$.roleId': {
            dropdown: dropdownType.pickRole,
            action: 'Select',
        },
        'lobby.$.health': {
            dropdown: dropdownType.pickUpdate,
            action: 'Select',
        },
        'lobby.$.dead': {
            dropdown: dropdownType.pickBoolean,
            action: 'Select',
        },
        'choices': {
            dropdown: dropdownType.pickUpdate,
            action: 'Select',
        },
        'events': {
            dropdown: dropdownType.writeNews,
            action: 'Add',
        },
    }
}

export default (state = initialState, action) => {
    switch(action.type){
        default:
            return state;
    }
}