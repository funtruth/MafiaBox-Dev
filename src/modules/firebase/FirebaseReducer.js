import _ from 'lodash'
import './firebase'
import firebaseService from './firebaseService'
import { fieldType } from '../fields/defaults'
import { getCode } from '../logic/LogicReducer';

const initialState = {
    gameKey: 'mafia',
    authUser: {
        firstName: "",
        lastName: "",
        email: "",
        emailVerified: false,
        photoUrl: "",
        uid: "",
    },
}

const AUTH_USER_INFO = 'listener/auth-user-info'

export function onAuthUser(user) {
    return (dispatch) => {
        dispatch({
            type: AUTH_USER_INFO,
            payload: user,
        })
    }
}

//TESTING ACTIONS
export function savePageToDB(pageKey) {
    return (dispatch, getState) => {
        const { pageRepo } = getState().page
        const { gameKey } = getState().db
        
        if (!pageKey || !gameKey) return

        const pageInfo = pageRepo[pageKey] || {}
        const { boardType } = pageInfo

        if (!boardType) return

        firebaseService.update(
            `dev/${gameKey}/${boardType}/${pageKey}`,
            JSON.parse(JSON.stringify(pageInfo).replace(/\$/g, '½').replace(/\./g, '¾'))
        )
    }
}

export function publishPage(pageKey) {
    return (dispatch, getState) => {
        const { pageRepo } = getState().page
        const { fieldRepo } = getState().field
        const { gameKey } = getState().db
        
        if (!pageKey || !gameKey) return

        const pageInfo = pageRepo[pageKey] || {}
        
        let batchUpdate = Object.assign({}, pageInfo)
        const path = `library/${gameKey}/${pageKey}`

        Object.keys(batchUpdate).forEach(i => {
            if (fieldRepo[i]) {
                switch(fieldRepo[i].fieldType) {
                    case fieldType.logic.key:
                        const origin = _.findKey(pageInfo[i], i => !i.source)
                        batchUpdate[i] = dispatch(getCode(origin, pageInfo[i]))
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

export default (state = initialState, action) => {
    switch(action.type){
        case AUTH_USER_INFO:
            return { ...state, authUser: Object.assign({}, state.authUser, action.payload) }
        default:
            return state;
    }
}