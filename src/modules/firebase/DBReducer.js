import _ from 'lodash'
import firebaseService from './firebaseService'
import { fieldType } from '../fields/defaults'
import { getCode } from '../logic/LogicReducer';

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
        const { fieldRepo } = getState().field
        const { gameKey } = getState().db
        
        if (!pageKey || !gameKey) return

        const pageInfo = pageRepo[pageKey] || {}
        const { boardType } = pageInfo
        
        let batchUpdate = Object.assign({}, pageInfo)
        const path = `library/${gameKey}/${boardType}/${pageKey}`

        Object.keys(batchUpdate).forEach(i => {
            if (fieldRepo[i]) {
                switch(fieldRepo[i].fieldType) {
                    case fieldType.logic.key:
                        const origin = _.findKey(pageInfo[i], i => !i.source)
                        batchUpdate[i] = dispatch(getCode(fieldRepo[i], origin, pageInfo[i]))
                            .replace(/(\r\n|\n|\r|\s\s\s\s)/gm,"")
                        break
                    case fieldType.playerTag.key:
                        Object.keys(pageInfo[i]).forEach(j => pageInfo[i][j] && (batchUpdate[j] = true))
                        batchUpdate[i] = null
                        break
                    default:
                }
            }
        })
        
        firebaseService.update(path, batchUpdate)
    }
}

/*function testFunction(string) {
    console.time('hello!')
    for (var i=0; i<100; i++) {
        Function(`return ${string}`)()({lobby: {michael: {}, immy: {},}, gameState: {}, updates: {}}, 'michael', 'immy')
    }
    console.timeEnd('hello!')
}*/

export default (state = initialState, action) => {
    switch(action.type){
        default:
            return state;
    }
}