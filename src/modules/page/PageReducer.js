import _ from 'lodash'
import { diff } from 'deep-diff'
import * as helpers from '../common/helpers'
import firebase from 'firebase/app'

import { modalType } from '../modal/types'
import { initStoryMap, DEFAULT_NORMAL } from './defaults'
import { boardType } from '../fields/defaults'
import { updateSourceType } from '../common/types';

import { pathToFirebase, valueToFirebase } from '../common/translators'
import { showModal } from '../modal/ModalReducer';

const initialState = {
    boardRepo: boardType,
    pageRepo: {},
    pageMap: {},
    storyRepo: {},
    storyMap: {},
    pageStorage: {},
}

const ADD_STORY = 'story/add-story-to'
const UPDATE_STORY = 'story/update-story'
const REMOVE_STORY = 'story/remove-story'
const MOVE_STORY = 'story/move-story'
const MOVE_PAGE_WITHIN_MAP = 'page/move-page-within-map'
const MOVE_PAGE_TO_OTHER_MAP = 'page/move-page-to-other-map'

const UPDATE_REPO = 'page/update-repo'
const ADD_PAGE = 'page/add-page'
const REMOVE_PAGE = 'page/remove-page'

const SWAP_FROM_STORAGE = 'page/swap-from-storage'
const UPDATE_STORAGE = 'page/update-storage'

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
            title: "",
            boardType,
            default: false,
        }

        dispatch({
            type: ADD_STORY,
            payload: {
                storyRepo:  storyRepoClone,
                storyMap:   storyMapClone,
            },
        })
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

        dispatch({
            type: REMOVE_STORY,
            payload: {
                pageRepo: pageRepoClone,
                pageMap: pageMapClone,
                storyRepo: storyRepoClone,
                storyMap: storyMapClone,
            }
        })
    }
}

export function updateStory(storyKey, update) {
    return(dispatch, getState) => {
        console.log({storyKey, update})
        const { storyRepo } = getState().page

        let storyRepoClone = _.cloneDeep(storyRepo)

        Object.assign(storyRepoClone[storyKey], update)

        dispatch({
            type: UPDATE_STORY,
            payload: {
                storyRepo: storyRepoClone,
            },
        })
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
        
        dispatch({
            type: MOVE_STORY,
            payload: {
                storyMap: storyMapClone,
            },
        })
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

        dispatch({
            type: ADD_PAGE,
            payload: {
                pageRepo: pageRepoClone,
                pageMap: pageMapClone,
            },
        })
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

        dispatch({
            type: MOVE_PAGE_WITHIN_MAP,
            payload: {
                pageMap: pageMapClone,
            },
        })
    }
}

export function movePageToOtherMap(startKey, endKey, startIndex, endIndex) {
    return (dispatch, getState) => {
        const { pageMap } = getState().page
        
        let pageMapClone = _.cloneDeep(pageMap)

        //set pointers
        let startPointer = pageMapClone[startKey]
        if (!_.isArray(pageMapClone[endKey])) {
            pageMapClone[endKey] = []
        }
        let endPointer = pageMapClone[endKey]
        
        //move item
        const [removed] = startPointer.splice(startIndex, 1)
        endPointer.splice(endIndex, 0, removed)

        dispatch({
            type: MOVE_PAGE_TO_OTHER_MAP,
            payload: {
                pageMap: pageMapClone,
            },
        })
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
        
        dispatch({
            type: REMOVE_PAGE,
            payload: {
                pageRepo: pageRepoClone,
                pageMap: pageMapClone,
            },
        })
    }
}

export function getProjectFromStorage(projectKey) {
    return (dispatch, getState) => {

        dispatch({
            type: SWAP_FROM_STORAGE,
            payload: {

            }
        })
    }
}

//projectKey [DEV]
//keyType -> storyMap, pageRepo
export function updateStorage(projectKey, keyType, value) {
    return (dispatch, getState) => {
        const { pageStorage } = getState().page

        const storageClone = helpers.updateByPath([projectKey, keyType], value, pageStorage)

        dispatch({
            type: UPDATE_STORAGE,
            payload: storageClone,
        })
    }
}

export function updateRepo(path, update, extraPath=[]) {
    return (dispatch, getState) => {
        const { pageRepo } = getState().page

        const totalPath = path.concat(extraPath)
        const repoClone = helpers.updateByPath(totalPath, update, pageRepo)

        dispatch(pushAndUpdateRepo(repoClone))
    }
}

export function pushAndUpdateRepo(repoClone) {
    return (dispatch, getState) => {
        const { pageRepo } = getState().page
        const { activeProject } = getState().firebase 

        let batchUpdate = {},
            pathToRepo = `dev/${activeProject}/`;

        diff(pageRepo, repoClone).forEach(item => batchUpdate[pathToRepo + item.path.join('/')] = item.rhs)
        firebase.database().ref().update(batchUpdate)

        dispatch({
            type: UPDATE_REPO,
            payload: repoClone,
        })
    }
}

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
        case MOVE_PAGE_WITHIN_MAP:
        case MOVE_PAGE_TO_OTHER_MAP:
        case REMOVE_PAGE:
            return { ...state, ...action.payload }
            
        case UPDATE_REPO:
            return { ...state, pageRepo: action.payload }

        case UPDATE_STORAGE:
            return { ...state, pageStorage: action.payload }
        case SWAP_FROM_STORAGE:
            return { ...state, ...action.payload }
        default:
            return state;
    }
}