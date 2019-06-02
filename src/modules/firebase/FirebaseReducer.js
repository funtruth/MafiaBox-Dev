import './firebase'

import { navigate } from '../app/NavReducer'
import { resetPageReducer } from '../page/PageReducer';

const initialState = {
    authUser: {
        firstName: "",
        lastName: "",
        email: "",
        emailVerified: false,
        photoUrl: "",
        uid: "",
    },
    userOnline: false,
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
        dispatch(resetPageReducer())
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