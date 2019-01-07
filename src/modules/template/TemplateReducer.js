import { dropdownType } from '../dropdown/types'
import { variableType } from '../logic/types'

const initialState = {
    updateRefs: {
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
            variableType: variableType.number.key,
        },
        'gameState.veto': {
            dropdown: dropdownType.pickUpdate,
            action: 'Select',
            variableType: variableType.number.key,
        },
        'gameState.nominate': {
            dropdown: dropdownType.pickUid,
            action: 'Add',
            variableType: variableType.object.key,
        },
        'gameState.nominate.$': {
            dropdown: dropdownType.pickUpdate,
            action: 'Add',
            hideButton: true,
            variableType: variableType.uid.key,
        },
        'lobby': {
            dropdown: dropdownType.pickUid,
            action: 'Add',
            variableType: variableType.object.key,
        },
        'lobby.$': {
            dropdown: dropdownType.addUpdateField,
            action: 'Add',
            variableType: variableType.uid.key,
        },
        'lobby.$.role': {
            dropdown: dropdownType.addUpdateField,
            action: 'Add',
            variableType: variableType.object.key,
        },
        'lobby.$.role.roleId': {
            dropdown: dropdownType.pickRole,
            action: 'Select',
            variableType: variableType.string.key,
        },
        'lobby.$.health': {
            dropdown: dropdownType.pickUid,
            action: 'Add',
            variableType: variableType.object.key,
        },
        'lobby.$.health.$': {
            dropdown: dropdownType.pickUpdate,
            action: 'Select',
            variableType: variableType.uid.key,
        },
        'lobby.$.dead': {
            dropdown: dropdownType.pickBoolean,
            action: 'Select',
            variableType: variableType.boolean,
        },
        'choices': {
            dropdown: dropdownType.pickUpdate,
            action: 'Select',
            variableType: variableType.object.key,
        },
        'events': {
            dropdown: dropdownType.writeNews,
            action: 'Add',
            variableType: variableType.object.key,
        },
    }
}

export default (state = initialState, action) => {
    switch(action.type){
        default:
            return state;
    }
}