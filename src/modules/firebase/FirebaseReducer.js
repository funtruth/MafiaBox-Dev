import _ from 'lodash'
import './firebase'
import firebase from 'firebase/app'
import { fieldType } from '../fields/defaults'

import { getCode } from '../logic/LogicReducer';
import { navigate } from '../navigation/NavReducer'

const initialState = {
    authUser: {
        firstName: "",
        lastName: "",
        email: "",
        emailVerified: false,
        photoUrl: "",
        uid: "",
    },
    activeProject: "",
    userProjects: {},
    projects: {},
}

const USER_LISTENER = 'fblistener/user-update'
const USER_PROJECTS_LISTENER = 'fblistener/user-projects-update'
const PROJECT_LISTENER = 'fblistener/project-update'
const CHANGE_ACTIVE_PROJECT = ' fb/change-active-project'

export function userListener(user) {
    return (dispatch) => {
        dispatch({
            type: USER_LISTENER,
            payload: user,
        })
    }
}

export function userProjectsListener(projects) {
    return (dispatch) => {
        dispatch({
            type: USER_PROJECTS_LISTENER,
            payload: projects || {},
        })
    }
}

export function switchToProject(projectKey) {
    return (dispatch) => {
        dispatch(navigate("/" + projectKey))
        dispatch({
            type: CHANGE_ACTIVE_PROJECT,
            payload: projectKey,
        })
    }
}

export function projectListener(snap) {
    return (dispatch, getState) => {
        const { projects } = getState().firebase
        
        const mergedProjects = {
            ...projects,
            [snap.key]: snap.val(),
        }
        
        dispatch({
            type: PROJECT_LISTENER,
            payload: mergedProjects,
        })
    }
}

export function getMyInfo() {
    return (dispatch, getState) => {
        const { authUser } = getState().firebase

        return (({
            firstName,
            lastName,
            email,
            photoUrl,
            uid
        }) => ({
            firstName,
            lastName,
            email,
            photoUrl,
            uid
        }))(authUser)
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

        firebase.database().ref(`dev/${gameKey}/${boardType}/${pageKey}`)
        .update(
            JSON.parse(
                JSON.stringify(pageInfo).replace(/\$/g, '½').replace(/\./g, '¾')
            )
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
        
        firebase.database().ref(path).update(batchUpdate)
    }
}

export default (state = initialState, action) => {
    switch(action.type){
        case USER_LISTENER:
            return { ...state, authUser: Object.assign({}, state.authUser, action.payload) }
        case USER_PROJECTS_LISTENER:
            return { ...state, userProjects: action.payload }
        case PROJECT_LISTENER:
            return { ...state, projects: action.payload }
        case CHANGE_ACTIVE_PROJECT:
            return { ...state, activeProject: action.payload }
        default:
            return state;
    }
}