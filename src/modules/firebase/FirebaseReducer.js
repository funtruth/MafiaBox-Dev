import './firebase'
import firebase from 'firebase/app'
import { diff } from 'deep-diff'

import { navigate } from '../app/NavReducer'
import { resetPageReducer } from '../page/PageReducer';
import { updateByPath } from '../common/helpers';

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

const VALID_PROPS = [
    'title',
    'description',
]

const USER_LISTENER = 'fblistener/user-update'
const USER_PROJECTS_LISTENER = 'fblistener/user-projects-update'
const PROJECT_USERS_LISTENER = 'fblistener/project-users-update'
const CHANGE_ACTIVE_PROJECT = 'fb/change-active-project'
const UPDATE_PROJECT = 'fb/update-project'

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

export function updateProject(...updates) {
    return (dispatch, getState) => {
        const { projectUsers, activeProject } = getState().firebase
        
        let reducer;
        updates.forEach(({path, update}) => {
            reducer = updateByPath(path, update, reducer || projectUsers[activeProject])
        })
        
        dispatch(receiveAction({
            type: UPDATE_PROJECT,
            payload: reducer,
        }))
    }
}

//intercepts redux action/payload and checks diffs to properly update firebase
//dispatches the action/payload
export function receiveAction({type, payload}) {
    return (dispatch, getState) => {
        const { projectUsers, activeProject } = getState().firebase 

        let batchUpdate = {},
            pathToRepo = `projectUsers/${activeProject}/`;

        const handleDiff = (item) => {
            if (!item.path) {
                return batchUpdate[prop] = item.rhs || ""
            }

            switch(item.kind) {
                case "A":
                    batchUpdate[prop + '/' + item.path.join('/') + '/' + item.index] = item.item.rhs || ""
                    break
                default:
                    batchUpdate[prop + '/' + item.path.join('/')] = item.rhs || ""
            }
        }
        
        for (var prop in payload) {
            if (!VALID_PROPS.includes(prop)) {
                console.warn('This is not a valid prop', prop, 'error coming from action:', type)
                continue
            }
            
            const diffs = diff(projectUsers[prop], payload[prop])
            if (diffs) diffs.forEach(handleDiff)
        }
        
        try {
            console.log('receiveAction', {batchUpdate})
            firebase.database().ref(pathToRepo).update(batchUpdate)
        } catch {
            console.log('there was an error updating to Firebase', {batchUpdate})
        }
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