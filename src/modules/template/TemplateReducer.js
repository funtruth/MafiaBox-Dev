const initialState = {
    room: {
        gameState: {
            phase: '',
            counter1: 0,
            veto: 0,
            nominate: '',
        },
        lobby: {
            '{player1}': {
                name: '',
                roleId: '',
                uid: '',
                dead: '',
                health: '',
            },
        },
        choice: {},
        news: {},
    }
}

export default (state = initialState, action) => {
    switch(action.type){
        default:
            return state;
    }
}