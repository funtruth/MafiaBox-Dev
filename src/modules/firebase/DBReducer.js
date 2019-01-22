import firebaseService from './firebaseService'

const initialState = {
    gameKey: 'mafia',
}

export function publishPage(pageKey) {
    return (dispatch, getState) => {
        const { pageRepo } = getState().page
        const { gameKey } = getState().db
        
        if (!pageKey || !gameKey) return
        const pageInfo = pageRepo[pageKey] || {}

        firebaseService.update(`library/${gameKey}/roles/${pageKey}`, pageInfo)
    }
}

export default (state = initialState, action) => {
    switch(action.type){
        default:
            return state;
    }
}