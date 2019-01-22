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
        const { boardType } = pageInfo

        if (!boardType) return

        firebaseService.update(`dev/${gameKey}/${boardType}/${pageKey}`,
            JSON.parse(JSON.stringify(pageInfo).replace(/\$/g, '½').replace(/\./g, '¾')))
    }
}

export default (state = initialState, action) => {
    switch(action.type){
        default:
            return state;
    }
}