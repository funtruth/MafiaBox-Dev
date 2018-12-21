import { dropdownType } from '../dropdown/types'

const initialState = {
    updates: {
        gameState: {
            phase: {
                dropdownType: dropdownType.pickPhase,
            },
            counter1: {
                dropdownType: dropdownType.pickUpdate,
            },
            veto: {
                dropdownType: dropdownType.pickUpdate,
            },
            nominate: {
                dropdownType: dropdownType.pickUid,
            },
        },
        lobby: {
            dropdownType: dropdownType.pickUid,
            "/uid/": {
                name: {
                    dropdownType: dropdownType.pickUpdate,
                },
                roleId: {
                    dropdownType: dropdownType.pickUpdate,
                },
                dead: {
                    dropdownType: dropdownType.pickUpdate,
                },
                health: {
                    dropdownType: dropdownType.pickUpdate,
                },
            }
        },
        choice: {
            dropdownType: dropdownType.pickUpdate,
        },
        news: {
            dropdownType: dropdownType.writeNews,
        },
    },
}

export default (state = initialState, action) => {
    switch(action.type){
        default:
            return state;
    }
}