import _ from 'lodash'
import { diff } from 'deep-diff'
import firebase from 'firebase/app'

import { boardType, modalType } from '../common/types'

import { showModal } from '../modal/ModalReducer';
import { navigateStack } from '../app/NavReducer'
import { DEFAULT_PUBLISH_INFO } from './defaults';
import generatePushID from '../common/generatePushID';
import { updateByPath } from '../common/helpers';

const initialState = {
    pageRepo: {},
    pageMap: {},
    storyRepo: {},
    storyMap: {},
    fieldRepo: {},
    fieldMap: {},
    globalVars: {},
    rssMap: {},
}

export const VALID_PROPS = [
    'pageRepo',
    'pageMap',
    'storyRepo',
    'storyMap',
    'fieldRepo',
    'fieldMap',
    'globalVars',
    'rssMap',
]

export const PROP_LISTENERS = {
    pageRepo: 'children',
    pageMap: 'children',
    storyRepo: 'children',
    storyMap: 'value',
    fieldRepo: 'children',
    fieldMap: 'children',
    globalVars: 'children',
    rssMap: 'value',
}

export const LISTENER_TYPE = {
    children: 'children',
    value: 'value',
}

const ADD_STORY = 'story/add-story-to'
const REMOVE_STORY = 'story/remove-story'
const MOVE_STORY = 'story/move-story'
const ADD_PAGE = 'page/add-page'
const MOVE_PAGE_WITHIN_MAP = 'page/move-page-within-map'
const MOVE_PAGE_TO_OTHER_MAP = 'page/move-page-to-other-map'
const CONNECT_PHASES = 'page/connect-phases'

const PUBLISH_PAGE = 'page/publish-page'
const REMOVE_PAGE = 'page/remove-page'

const RECEIVE_CHILD_EVENT = 'page/receive-child-event'
const RECEIVE_VALUE = 'page/receive-value'
const UPDATE_GENERAL = 'page/update-general'
const RESET_REDUCER = 'page/reset-reducer'

export function addStory() {
    return (dispatch, getState) => {
        const { storyRepo, storyMap } = getState().page

        let storyRepoClone  = _.cloneDeep(storyRepo)
        let storyMapClone   = _.cloneDeep(storyMap)

        const storyKey = generatePushID('story')

        if (!storyMapClone) {
            storyMapClone = {}
        }

        //add story
        storyMapClone[Object.keys(storyMapClone).length] = storyKey
        storyRepoClone[storyKey] = {
            key: storyKey,
            title: "",
        }

        dispatch(receiveAction({
            type: ADD_STORY,
            payload: {
                storyRepo:  storyRepoClone,
                storyMap:   storyMapClone,
            },
        }))
    }
}

export function removeStory(board, storyKey) {
    return (dispatch, getState) => {
        const { pageRepo, pageMap, storyRepo, storyMap } = getState().page

        let pageRepoClone   = _.cloneDeep(pageRepo)
        let pageMapClone    = _.cloneDeep(pageMap)
        let storyRepoClone  = _.cloneDeep(storyRepo)
        let storyMapClone   = _.cloneDeep(storyMap)

        //remove story
        _.pull(storyMapClone[board], storyKey)
        storyRepoClone[storyKey] = null

        //null checks
        if (!pageMapClone[storyKey]) {
            pageMapClone[storyKey] = []
        }

        //remove affected pages
        pageMapClone[storyKey].forEach(item => {
            pageRepoClone[item] = null
        })
        pageMapClone[storyKey] = null

        dispatch(receiveAction({
            type: REMOVE_STORY,
            payload: {
                pageRepo: pageRepoClone,
                pageMap: pageMapClone,
                storyRepo: storyRepoClone,
                storyMap: storyMapClone,
            }
        }))
    }
}

export function addPageToMap(storyKey, board) {
    return (dispatch, getState) => {
        const { pageRepo, pageMap, fieldRepo, fieldMap } = getState().page

        let pageRepoClone   = _.cloneDeep(pageRepo)
        let pageMapClone    = _.cloneDeep(pageMap)
        
        const pageKey = generatePushID(board)

        //set-up defaults
        let defaultInfo = {}
        if (fieldMap[board]) {
            fieldMap[board].forEach(field => {
                if (fieldRepo[field] && fieldRepo[field].defaultValue) {
                    defaultInfo[field] = fieldRepo[field].defaultValue
                }
            })
        }
        
        //set page info
        pageRepoClone[pageKey] = {
            key: pageKey,
            board: board,
            story: storyKey,
            publishInfo: DEFAULT_PUBLISH_INFO,
            ...defaultInfo,
        }

        //set page location
        if (!_.isArray(pageMapClone[storyKey])) {
            pageMapClone[storyKey] = []
        }
        pageMapClone[storyKey].unshift(pageKey)

        dispatch(receiveAction({
            type: ADD_PAGE,
            payload: {
                pageRepo: pageRepoClone,
                pageMap: pageMapClone,
            }
        }))

        switch(board) {
            case boardType.modes.key:
                dispatch(navigateStack(pageKey))
                break;
            case boardType.events.key:
            case boardType.phases.key:
            case boardType.roles.key:
            default:
                dispatch(showModal(modalType.showPage, {
                    pageKey,
                    path: ['pageRepo', pageKey],
                }))
        }
    }
}

//PatchItem
export function movePageWithinMap(stateKey, storyKey, startIndex, endIndex) {
    return (dispatch, getState) => {
        const map = getState().page[stateKey]
        
        let mapClone = _.cloneDeep(map)

        //set pointer
        let pointer = mapClone[storyKey]
        
        //move item
        const [removed] = pointer.splice(startIndex, 1)
        pointer.splice(endIndex, 0, removed)

        dispatch(receiveAction({
            type: MOVE_PAGE_WITHIN_MAP,
            payload: {
                [stateKey]: mapClone,
            },
        }))
    }
}

export function movePageToOtherMap(startKey, endKey, startIndex, endIndex) {
    return (dispatch, getState) => {
        const { pageRepo, pageMap } = getState().page
        
        let pageRepoClone   = _.cloneDeep(pageRepo)
        let pageMapClone    = _.cloneDeep(pageMap)

        //set pointers
        let startPointer = pageMapClone[startKey]
        if (!_.isArray(pageMapClone[endKey])) {
            pageMapClone[endKey] = []
        }
        let endPointer = pageMapClone[endKey]
        
        //move item
        const [removed] = startPointer.splice(startIndex, 1)
        endPointer.splice(endIndex, 0, removed)
        pageRepoClone[removed].storyType = endKey;

        dispatch(receiveAction({
            type: MOVE_PAGE_TO_OTHER_MAP,
            payload: {
                pageRepo: pageRepoClone,
                pageMap: pageMapClone,
            },
        }))
    }
}

export function removePage(pageKey, storyKey) {
    return (dispatch, getState) => {
        const { pageRepo, pageMap } = getState().page
        
        let pageRepoClone   = _.cloneDeep(pageRepo)
        let pageMapClone    = _.cloneDeep(pageMap)

        //remove from pageMap
        _.pull(pageMapClone[storyKey], pageKey)
        pageRepoClone[pageKey] = null
        
        dispatch(receiveAction({
            type: REMOVE_PAGE,
            payload: {
                pageRepo: pageRepoClone,
                pageMap: pageMapClone,
            },
        }))
    }
}

//connects two phases through "Phase Listener" field
export function connectPhases(fromKey, toKey) {
    return (dispatch, getState) => {

    }
}

export function resetPageReducer() {
    return (dispatch) => {
        dispatch({type: RESET_REDUCER})
    }
}

export function receiveValue(snap, key) {
    return (dispatch, getState) => {
        const { page } = getState()

        let stateClone = _.cloneDeep(page)
        stateClone[key] = _.toPlainObject(snap.val())
        
        dispatch({
            type: RECEIVE_VALUE,
            payload: stateClone,
        })
    }
}

export function receiveEvent(snap, key) {
    return (dispatch, getState) => {
        const { page } = getState()

        let stateClone = _.cloneDeep(page)
        if (!stateClone[key]) stateClone[key] = {}
        stateClone[key][snap.key] = snap.val()
        
        dispatch({
            type: RECEIVE_CHILD_EVENT,
            payload: stateClone,
        })
    }
}

//TODO need a proper delete, should be run on startup or something
export function receiveDeleteEvent(snap, key) {
    return (dispatch, getState) => {
        const { page } = getState()

        let stateClone = _.cloneDeep(page)
        if (!stateClone[key]) return;
        stateClone[key][snap.key] = null

        dispatch({
            type: RECEIVE_CHILD_EVENT,
            payload: stateClone,
        })
    }
}

export function updateGeneral(...updates) {
    return (dispatch, getState) => {
        const { page } = getState()
        
        let reducer;
        updates.forEach(({path, update}) => {
            reducer = updateByPath(path, update, reducer || page)
        })
        
        dispatch(receiveAction({
            type: UPDATE_GENERAL,
            payload: reducer,
        }))
    }
}

//intercepts redux action/payload and checks diffs to properly update firebase
//dispatches the action/payload
export function receiveAction({type, payload}) {
    return (dispatch, getState) => {
        const { page } = getState()
        const { activeProject } = getState().firebase 

        let batchUpdate = {},
            pathToRepo = `dev/${activeProject}/`;

        const filterType = (rhs) => {
            const type = typeof rhs
            if (type === 'undefined') return ""
            else return rhs
        }

        const handleDiff = (item) => {
            if (!item.path) {
                return batchUpdate[prop] = item.rhs || ""
            }

            switch(item.kind) {
                case "A":
                    batchUpdate[prop + '/' + item.path.join('/') + '/' + item.index] = filterType(item.item.rhs)
                    break
                default:
                    batchUpdate[prop + '/' + item.path.join('/')] = filterType(item.rhs)
            }
        }
        
        for (var prop in payload) {
            if (!VALID_PROPS.includes(prop)) {
                console.warn('This is not a valid prop', prop, 'error coming from action:', type)
                continue
            }
            
            const diffs = diff(page[prop], payload[prop])
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
        case ADD_STORY: 
        case REMOVE_STORY:
        case MOVE_STORY:
        case ADD_PAGE:
        case PUBLISH_PAGE:
        case MOVE_PAGE_WITHIN_MAP:
        case MOVE_PAGE_TO_OTHER_MAP:
        case CONNECT_PHASES:
        case REMOVE_PAGE:
        case RECEIVE_CHILD_EVENT:
        case RECEIVE_VALUE:
            return { ...state, ...action.payload }
        case RESET_REDUCER:
            return initialState;
        default:
            return state;
    }
}