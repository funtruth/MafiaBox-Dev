import _ from 'lodash'
import { diff } from 'deep-diff'
import firebase from 'firebase/app'

import { modalType } from '../modal/types'

import { showModal } from '../modal/ModalReducer';
import { DEFAULT_PUBLISH_INFO } from './defaults';
import generatePushID from '../common/generatePushID';
import { updateByPath } from '../common/helpers';

const initialState = {
    pageRepo: {},
    pageMap: {},
    storyRepo: {},
    storyMap: {},
    modeRepo: {},
    modeMap: {},
    fieldRepo: {},
    fieldMap: {},
    globalVars: {},
}

export const VALID_PROPS = [
    'pageRepo',
    'pageMap',
    'storyRepo',
    'storyMap',
    'modeRepo',
    'modeMap',
    'fieldRepo',
    'fieldMap',
    'globalVars',
]

export const PROP_LISTENERS = {
    pageRepo: 'children',
    pageMap: 'children',
    storyRepo: 'children',
    storyMap: 'value',
    modeRepo: 'children',
    modeMap: 'children',
    fieldRepo: 'children',
    fieldMap: 'children',
    globalVars: 'children',
}

export const LISTENER_TYPE = {
    children: 'children',
    value: 'value',
}

const ADD_STORY = 'story/add-story-to'
const UPDATE_STORY = 'story/update-story'
const REMOVE_STORY = 'story/remove-story'
const MOVE_STORY = 'story/move-story'
const ADD_PAGE = 'page/add-page'
const ADD_MODE = 'page/add-mode'
const ADD_PAGE_TO_MODE = 'page/add-page-to-mode'
const MOVE_PAGE_WITHIN_MAP = 'page/move-page-within-map'
const MOVE_PAGE_TO_OTHER_MAP = 'page/move-page-to-other-map'
const CONNECT_PHASES = 'page/connect-phases'

const PUBLISH_PAGE = 'page/publish-page'
const REMOVE_PAGE = 'page/remove-page'
const UPDATE_REPO = 'page/update-repo'
const DIFF_PRIORITIES = 'page/diff-priorities'

const RECEIVE_EVENT = 'page/receive-event'
const RECEIVE_CHILD_EVENT = 'page/receive-child-event'
const RECEIVE_VALUE = 'page/receive-value'
const RESET_REDUCER = 'page/reset-reducer'

const UPDATE_FIELD = 'page/update-field'
const UPDATE_GLOBAL = 'page/update-global'
const UPDATE_GENERAL = 'page/update-general'

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

export function removeStory(boardType, storyKey) {
    return (dispatch, getState) => {
        const { pageRepo, pageMap, storyRepo, storyMap } = getState().page

        let pageRepoClone   = _.cloneDeep(pageRepo)
        let pageMapClone    = _.cloneDeep(pageMap)
        let storyRepoClone  = _.cloneDeep(storyRepo)
        let storyMapClone   = _.cloneDeep(storyMap)

        //remove story
        _.pull(storyMapClone[boardType], storyKey)
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

export function moveStory(startIndex, endIndex) {
    return (dispatch, getState) => {
        const { storyMap } = getState().page

        //convert []-like {} to []
        let storyMapClone = _.cloneDeep(storyMap)
        let storyMapArray = _.toArray(storyMapClone)

        //move item
        const [removed] = storyMapArray.splice(startIndex, 1)
        storyMapArray.splice(endIndex, 0, removed)

        //convert [] to []-like {}
        storyMapClone = _.toPlainObject(storyMapArray)
        
        dispatch(receiveAction({
            type: MOVE_STORY,
            payload: {
                storyMap: storyMapClone,
            },
        }))
    }
}

export function addPageToMap(storyKey, boardType) {
    return (dispatch, getState) => {
        const { pageRepo, pageMap, fieldRepo, fieldMap } = getState().page

        let pageRepoClone   = _.cloneDeep(pageRepo)
        let pageMapClone    = _.cloneDeep(pageMap)
        
        const pageKey = generatePushID(boardType)

        //set-up defaults
        let defaultInfo = {}
        fieldMap[boardType].forEach(field => {
            if (fieldRepo[field] && fieldRepo[field].defaultValue) {
                defaultInfo[field] = fieldRepo[field].defaultValue
            }
        })
        
        //set page info
        pageRepoClone[pageKey] = {
            pageKey,
            boardType,
            storyType: storyKey,
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
        dispatch(showModal(modalType.showPage, {
            pageKey,
            path: ['pageRepo', pageKey],
        }))
    }
}

//ModeHeader
export function addModeToPatch(storyKey) {
    return (dispatch, getState) => {
        const { modeRepo, modeMap } = getState().page

        let modeRepoClone   = _.cloneDeep(modeRepo)
        let modeMapClone    = _.cloneDeep(modeMap)
        
        const modeKey = generatePushID('mode')
        
        //set page info
        modeRepoClone[modeKey] = {
            modeKey,
            storyKey,
            publishInfo: DEFAULT_PUBLISH_INFO,
        }

        //set page location
        if (!_.isArray(modeMapClone[storyKey])) {
            modeMapClone[storyKey] = []
        }
        modeMapClone[storyKey].unshift(modeKey)

        dispatch(receiveAction({
            type: ADD_MODE,
            payload: {
                modeRepo: modeRepoClone,
                modeMap: modeMapClone,
            }
        }))
    }
}

//PhaseFlowHeader
export function addPageToMode(modeKey, boardType) {
    return (dispatch, getState) => {
        const { modeRepo, pageRepo, fieldRepo, fieldMap } = getState().page
        const { storyKey } = modeRepo[modeKey]

        let modeRepoClone   = _.cloneDeep(modeRepo)
        let pageRepoClone   = _.cloneDeep(pageRepo)
        
        const pageKey = generatePushID(boardType)

        //set-up defaults
        let defaultInfo = {}
        fieldMap[boardType].forEach(field => {
            if (fieldRepo[field] && fieldRepo[field].defaultValue) {
                defaultInfo[field] = fieldRepo[field].defaultValue
            }
        })
        
        //set page info
        pageRepoClone[pageKey] = {
            pageKey,
            boardType,
            modeKey,
            storyKey,
            ...defaultInfo,
        }

        //set page location in modeRepo.phaseMap
        let pointer = modeRepoClone[modeKey]
        if (!_.isArray(pointer.phaseMap)) {
            pointer.phaseMap = []
        }
        pointer.phaseMap.unshift(pageKey)

        dispatch(receiveAction({
            type: ADD_PAGE_TO_MODE,
            payload: {
                modeRepo: modeRepoClone,
                pageRepo: pageRepoClone,
            }
        }))
        dispatch(showModal(modalType.showPage, {
            pageKey,
            path: ['pageRepo', pageKey],
        }))
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

export function diffPriorities(attach) {
    return (dispatch, getState) => {
        const { pageRepo } = getState().page

        let pageRepoClone = _.cloneDeep(pageRepo)

        for (var i=0; i<attach.length; i++) {
            for (var j=0; j<attach[i].length; j++) {
                pageRepoClone[attach[i][j].pageKey].priority = i + 1
            }
        }

        dispatch(receiveAction({
            type: DIFF_PRIORITIES,
            payload: {
                pageRepo: pageRepoClone,
            }
        }))
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

/*promise handler for writes
const write = (path, value) => new Promise(resolve => {
    //https://stackoverflow.com/questions/41533993/cleancode-try-catch-in-promise
})*/

//publishes an item from redux state
export function publishFromState(stateKey, itemKey) {
    return (dispatch, getState) => {
        const { page } = getState()
        const { activeProject } = getState().firebase 

        if (!page[stateKey] || !page[stateKey][itemKey]) {
            console.warn('invalid publish.')
            return;
        }

        let pathToRepo = `games/${activeProject}/${stateKey}/${itemKey}`;

        try {
            firebase.database().ref(pathToRepo).update(page[stateKey][itemKey])
        } catch {
            console.log('there was an error updating to Firebase', {update: page[stateKey][itemKey]})
        }
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
            
            const diffs = diff(page[prop], payload[prop])
            if (diffs) diffs.forEach(handleDiff)
        }
        
        try {
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
        case UPDATE_STORY:
        case MOVE_STORY:
        case ADD_PAGE:
        case ADD_MODE:
        case ADD_PAGE_TO_MODE:
        case PUBLISH_PAGE:
        case DIFF_PRIORITIES:
        case MOVE_PAGE_WITHIN_MAP:
        case MOVE_PAGE_TO_OTHER_MAP:
        case CONNECT_PHASES:
        case REMOVE_PAGE:
        case RECEIVE_EVENT:
        case RECEIVE_CHILD_EVENT:
        case RECEIVE_VALUE:
        case UPDATE_REPO:
        case UPDATE_FIELD:
        case UPDATE_GLOBAL:
        case UPDATE_GENERAL:
            return { ...state, ...action.payload }
        case RESET_REDUCER:
            return initialState;
        default:
            return state;
    }
}