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
    projectUsers: {},
}

const USER_LISTENER = 'fblistener/user-update'
const USER_PROJECTS_LISTENER = 'fblistener/user-projects-update'
const PROJECT_USERS_LISTENER = 'fblistener/project-users-update'
const CHANGE_ACTIVE_PROJECT = ' fb/change-active-project'

export function userListener(user) {
    return (dispatch) => {
        dispatch({
            type: USER_LISTENER,
            payload: user,
        })
    }
}

export function userProjectsListener(snap) {
    return (dispatch) => {
        dispatch({
            type: USER_PROJECTS_LISTENER,
            payload: snap.val(),
        })
    }
}

export function switchToProject(projectKey) {
    return (dispatch, getState) => {
        const { activeProject } = getState().firebase

        //if switching projects, reset pageReducer
        if (projectKey !== activeProject) {
            dispatch(resetPageReducer())
            dispatch({
                type: CHANGE_ACTIVE_PROJECT,
                payload: projectKey,
            })
        }

        dispatch(navigate("/" + projectKey))
    }
}

export function projectUsersListener(snap) {
    return (dispatch, getState) => {
        const { projectUsers } = getState().firebase
        
        const mergedProjects = {
            ...projectUsers,
            [snap.key]: snap.val(),
        }
        
        dispatch({
            type: PROJECT_USERS_LISTENER,
            payload: mergedProjects,
        })
    }
}

export default (state = initialState, action) => {
    switch(action.type){
        case USER_LISTENER:
            return { ...state, authUser: {...state.authUser, ...action.payload} }
        case USER_PROJECTS_LISTENER:
            return { ...state, userProjects: action.payload }
        case PROJECT_USERS_LISTENER:
            return { ...state, projectUsers: action.payload }
        case CHANGE_ACTIVE_PROJECT:
            return { ...state, activeProject: action.payload }
        default:
            return state;
    }
}