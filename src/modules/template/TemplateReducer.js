import { dropdownType } from '../dropdown/types'
import { variableType } from '../logic/types'

const initialState = {
    updateRef: {
        'gameState': {
            dropdown: dropdownType.addUpdateField,
            action: 'Add',
            updatable: true,
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
            variableType: variableType.string.key,
        },
        'role.suspicious': {
            dropdown: dropdownType.pickBoolean,
            action: 'Select',
            variableType: variableType.boolean.key,
        },
        'health': {
            dropdown: dropdownType.pickUid,
            action: 'Add',
            variableType: variableType.object.key,
        },
        'health.$': {
            dropdown: dropdownType.pickUpdate,
            action: 'Select',
            variableType: variableType.uid.key,
        },
        'dead': {
            dropdown: dropdownType.pickBoolean,
            action: 'Select',
            variableType: variableType.boolean,
        },
    }
}

export default (state = initialState, action) => {
    switch(action.type){
        default:
            return state;
    }
}