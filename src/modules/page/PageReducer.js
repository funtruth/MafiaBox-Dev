import _ from 'lodash'
import { diff } from 'deep-diff'
import * as helpers from '../common/helpers'
import firebase from 'firebase/app'

import { modalType } from '../modal/types'
import { boardType } from '../fields/defaults'
import { updateSourceType } from '../common/types';

import { showModal } from '../modal/ModalReducer';

const initialState = {
    boardRepo: boardType,
    pageRepo: {},
    pageMap: {},
    storyRepo: {},
    storyMap: {},
}

const VALID_PROPS = ['pageRepo', 'pageMap', 'storyRepo', 'storyMap']

const ADD_STORY = 'story/add-story-to'
const UPDATE_STORY = 'story/update-story'
const REMOVE_STORY = 'story/remove-story'
const MOVE_STORY = 'story/move-story'
const MOVE_PAGE_WITHIN_MAP = 'page/move-page-within-map'
const MOVE_PAGE_TO_OTHER_MAP = 'page/move-page-to-other-map'

const UPDATE_REPO = 'page/update-repo'
const ADD_PAGE = 'page/add-page'
const REMOVE_PAGE = 'page/remove-page'
const PUBLISH_PAGE = 'page/publish-page'

const RECEIVE_EVENT = 'page/receive-event'
const RECEIVE_CHILD_EVENT = 'page/receive-child-event'
const RESET_REDUCER = 'page/reset-reducer'

export function addStory(boardType) {
    return (dispatch, getState) => {
        const { storyRepo, storyMap } = getState().page

        let storyRepoClone  = _.cloneDeep(storyRepo)
        let storyMapClone   = _.cloneDeep(storyMap)

        const storyKey = helpers.genUID('story', storyRepo)

        if (!storyMapClone[boardType]) {
            storyMapClone[boardType] = []
        }

        //add story
        storyMapClone[boardType].push(storyKey)
        storyRepoClone[storyKey] = {
            key: storyKey,
            publishKey: storyKey + "-live",
            title: "",
            boardType,
            default: false,
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

export function updateStory(storyKey, update) {
    return(dispatch, getState) => {
        const { storyRepo } = getState().page

        let storyRepoClone = _.cloneDeep(storyRepo)

        Object.assign(storyRepoClone[storyKey], update)

        dispatch(receiveAction({
            type: UPDATE_STORY,
            payload: {
                storyRepo: storyRepoClone,
            },
        }))
    }
}

export function moveStory(boardType, startIndex, endIndex) {
    return (dispatch, getState) => {
        const { storyMap } = getState().page

        let storyMapClone = _.cloneDeep(storyMap)

        //set pointer
        let pointer = storyMapClone[boardType]

        //move item
        const [removed] = pointer.splice(startIndex, 1)
        pointer.splice(endIndex, 0, removed)
        
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
        const { pageRepo, pageMap } = getState().page
        const { fieldRepo } = getState().field

        let pageRepoClone   = _.cloneDeep(pageRepo)
        let pageMapClone    = _.cloneDeep(pageMap)
        
        const pageKey = helpers.genUID(boardType, pageRepo)

        //set-up defaults
        let defaultInfo = {}
        _.filter(fieldRepo, i => i.boardType === boardType && i.default)
            .forEach(i => defaultInfo[i.key] = i.default)

        //set page info
        pageRepoClone[pageKey] = {
            pageKey,
            boardType,
            storyType: storyKey,
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
            path: [pageKey],
            updateSource: updateSourceType.repo,
        }))
    }
}

export function movePageWithinMap(storyKey, startIndex, endIndex) {
    return (dispatch, getState) => {
        const { pageMap } = getState().page
        
        let pageMapClone = _.cloneDeep(pageMap)

        //set pointer
        let pointer = pageMapClone[storyKey]
        
        //move item
        const [removed] = pointer.splice(startIndex, 1)
        pointer.splice(endIndex, 0, removed)

        dispatch(receiveAction({
            type: MOVE_PAGE_WITHIN_MAP,
            payload: {
                pageMap: pageMapClone,
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

export function publishPage(pageKey) {
    return (dispatch, getState) => {
        const { pageRepo, pageMap, storyRepo } = getState().page

        let pageRepoClone   = _.cloneDeep(pageRepo)
        let pageMapClone    = _.cloneDeep(pageMap)

        const pageInfo = pageRepoClone[pageKey] || {}
        const { storyType } = pageInfo

        const storyInfo = storyRepo[storyType] || {}
        const { publishKey } = storyInfo

        //check if published Map exists
        if (!_.isArray(pageMapClone[publishKey])) {
            pageMapClone[publishKey] = []
        }

        //push to new story, remove from old
        pageMapClone[publishKey].unshift(pageKey)
        _.pull(pageMapClone[storyType], pageKey)

        //update some properties
        pageInfo.storyType      = publishKey
        pageInfo.published      = true
        pageInfo.publishedAt    = Date.now()

        dispatch(receiveAction({
            type: PUBLISH_PAGE,
            payload: {
                pageRepo: pageRepoClone,
                pageMap: pageMapClone,
            }
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

export function resetPageReducer() {
    return (dispatch) => {
        dispatch({
            type: RESET_REDUCER,
            payload: {
                pageRepo: {},
                pageMap: {},
                storyRepo: {},
                storyMap: {},
            },
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

export function updateRepo(path, update, extraPath=[]) {
    return (dispatch, getState) => {
        const { pageRepo } = getState().page

        const totalPath = path.concat(extraPath)
        const repoClone = helpers.updateByPath(totalPath, update, pageRepo)

        dispatch(receiveAction({
            type: UPDATE_REPO,
            payload: {
                pageRepo: repoClone,
            },
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

        const handleDiff = (item) => {
            switch(item.kind) {
                case "A":
                    batchUpdate[prop + '/' + item.path.join('/') + '/' + item.index] = item.item.rhs || null
                    break
                default:
                    batchUpdate[prop + '/' + item.path.join('/')] = item.rhs || null
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

//TODO do this in component & send diffs here
export function saveAllPriorities(attach) {
    return (dispatch, getState) => {
        const { pageRepo } = getState().page
        let repoClone = Object.assign({}, pageRepo)

        for (var i=0; i<attach.length; i++) {
            for (var j=0; j<attach[i].length; j++) {
                repoClone[attach[i][j].pageKey].priority = i + 1
            }
        }

        dispatch({
            type: UPDATE_REPO,
            payload: repoClone,
        })
    }
}

//LogicBoard
export function deleteProp(pageKey, fieldKey, indexKey, subfieldKey) {
    return (dispatch, getState) => {
        const { pageRepo } = getState().page
        const repoClone = Object.assign({}, pageRepo)

        if (!repoClone[pageKey]) return
        if (!repoClone[pageKey][fieldKey]) return
        if (!repoClone[pageKey][fieldKey][indexKey]) return
        if (!repoClone[pageKey][fieldKey][indexKey].data) return
        if (!repoClone[pageKey][fieldKey][indexKey].data[subfieldKey]) return

        delete repoClone[pageKey][fieldKey][indexKey].data[subfieldKey]
        dispatch({
            type: UPDATE_REPO,
            payload: repoClone,
        })
    }
}

export default (state = initialState, action) => {
    switch(action.type){
        case ADD_STORY: 
        case REMOVE_STORY:
        case UPDATE_STORY:
        case MOVE_STORY:
        case ADD_PAGE:
        case PUBLISH_PAGE:
        case MOVE_PAGE_WITHIN_MAP:
        case MOVE_PAGE_TO_OTHER_MAP:
        case REMOVE_PAGE:
        case RECEIVE_EVENT:
        case RECEIVE_CHILD_EVENT:
        case UPDATE_REPO:
        case RESET_REDUCER:
            return { ...state, ...action.payload }
        default:
            return state;
    }
}