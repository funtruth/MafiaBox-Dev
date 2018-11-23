import { boardType } from './types'

const initialState = {
    boardOrder: [
        boardType.flow,
        boardType.roles,
        boardType.library
    ],
    boardRepo: {
        [boardType.library]: {
            title: 'Library',
        },
        [boardType.roles]: {
            title: 'Roles',
        },
        [boardType.flow]: {
            title: 'Phases',
        },
        [boardType.events]: {
            title: 'Events',
        },
    },
}

export default (state = initialState, action) => {
    switch(action.type){
        default:
            return state;
    }
}