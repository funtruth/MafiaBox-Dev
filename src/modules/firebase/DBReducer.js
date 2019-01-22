import firebaseService from './firebaseService'
import { boardType as boardTypeObject, fieldType } from '../fields/defaults'
import { getParents, getCode } from '../logic/LogicReducer';

const initialState = {
    gameKey: 'mafia',
}

export function savePageToDB(pageKey) {
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

export function publishPage(pageKey) {
    return (dispatch, getState) => {
        const { pageRepo } = getState().page
        
        if (!pageKey) return

        const pageInfo = pageRepo[pageKey] || {}
        const { boardType } = pageInfo
        
        switch(boardType) {
            case boardTypeObject.roles.key:
                dispatch(publishRole(pageInfo))
                break
            default:
        }
    }
}

function publishRole(pageInfo) {
    return (dispatch, getState) => {
        const { fieldRepo } = getState().field
        const { gameKey } = getState().db
        const { boardType, pageKey } = pageInfo

        if (!gameKey) return

        let batchUpdate = Object.assign({}, pageInfo)
        const path = `library/${gameKey}/${boardType}/${pageKey}`

        Object.keys(batchUpdate).forEach(i => {
            if (fieldRepo[i]) {
                switch(fieldRepo[i].fieldType) {
                    case fieldType.logic.key:
                        const parents = getParents(pageInfo[i])
                        batchUpdate[i] = dispatch(getCode(fieldRepo[i], Object.keys(parents)[0], pageInfo[i]))
                            .replace(/(\r\n|\n|\r|\s\s\s\s)/gm,"")
                        testFunction(batchUpdate[i])
                        break
                    default:
                }
            }
        })
        
        firebaseService.update(path, batchUpdate)
    }
}

export function testFunction(string) {
    console.time('hello!')
    for (var i=0; i<100; i++) {
        Function(`return ${string}`)()({lobby: {michael: {}, immy: {},}, gameState: {}, updates: {}}, 'michael', 'immy')
    }
    console.timeEnd('hello!')
    
}

export default (state = initialState, action) => {
    switch(action.type){
        default:
            return state;
    }
}