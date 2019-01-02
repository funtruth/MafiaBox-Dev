import { dropdownType } from '../dropdown/types'

const initialState = {
    updates: {
        gameState: {
            phase: dropdownType.pickPhase,
            counter1: dropdownType.pickUpdate,
            veto: dropdownType.pickUpdate,
            nominate: dropdownType.pickUid,
        },
        lobby: {
            dropdownType: dropdownType.pickUid,
            "/uid/": {
                name: dropdownType.pickUpdate,
                roleId: dropdownType.pickUpdate,
                dead: dropdownType.pickUpdate,
                health: dropdownType.pickUpdate,
            }
        },
        choices: dropdownType.pickUpdate,
        news: {
            dropdownType: dropdownType.writeNews,
        },
        events: {
            dropdownType: dropdownType.pickUid,
            "/uid/": {
                message: dropdownType.pickUpdate,
            }
        }
    },
    updateRefs: {
        'gameState': {
            dropdown: dropdownType.addUpdateField,
        },
        'gameState.phase': {
            dropdown: dropdownType.pickPhase,
        },
        'gameState.counter': {
            dropdown: dropdownType.pickUpdate,
        },
        'gameState.veto': {
            dropdown: dropdownType.pickUpdate,
        },
        'gameState.nominate': {
            dropdown: dropdownType.pickUid,
        },
        'gameState.nominate.$': {
            dropdown: dropdownType.pickUpdate,
        },
        'lobby': {
            dropdown: dropdownType.pickUid,
        },
        'lobby.$': {
            dropdown: dropdownType.addUpdateField,
        },
        'lobby.$.name': {
            dropdown: dropdownType.pickUpdate,
        },
        'lobby.$.roleId': {
            dropdown: dropdownType.pickUpdate,
        },
        'lobby.$.health': {
            dropdown: dropdownType.pickUpdate,
        },
        'lobby.$.dead': {
            dropdown: dropdownType.pickUpdate,
        },
        'choices': {
            dropdown: dropdownType.pickUpdate,
        },
        'news': {
            dropdownType: dropdownType.writeNews,
        },
        'events': {
            dropdown: dropdownType.pickUpdate,
        },
    }
}

export default (state = initialState, action) => {
    switch(action.type){
        default:
            return state;
    }
}