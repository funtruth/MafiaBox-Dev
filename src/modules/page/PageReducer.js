import _ from 'lodash'
import * as helpers from '../common/helpers'
import { modalType } from '../modal/types'
import { showModal } from '../modal/ModalReducer';

import { initStoryMap } from './defaults'
import { boardType } from '../fields/defaults'

const initialState = {
    storyMap: initStoryMap,
    boardRepo: boardType,
    pageRepo: {},
}

//storyMap:
const ADD_STORY = 'story/add-story-to'
const MOVE_STORY = 'story/move-story'
const MOVE_PAGE_WITHIN_MAP = 'page/move-page-within-map'
const MOVE_PAGE_TO_OTHER_MAP = 'page/move-page-to-other-map'

//[repo]sitory: holds all the pages keyed by pageKey
const UPDATE_REPO = 'page/update-repo'
const ADD_PAGE = 'page/add-page'
const REMOVE_PAGE = 'page/remove-page'
const UPDATE_PAGE = 'page/update-page'

export function addStory(title, boardType) {
    return (dispatch, getState) => {
        const { storyMap } = getState().page
        const storyKey = helpers.genUID('story', storyMap)

        let storyMapClone = Object.assign({}, storyMap)
        storyMapClone[storyKey] = {
            key: storyKey,
            title,
            boardType,
            default: false,
        }

        dispatch({
            type: ADD_STORY,
            payload: storyMapClone,
        })
    }
}

//TODO this looks like old code / broken
export function moveStory(startIndex, endIndex) {
    return (dispatch, getState) => {
        const { storyMap } = getState().page
        let storyMapClone = Array.from(storyMap)

        const [removed] = storyMapClone.splice(startIndex, 1)
        storyMapClone.splice(endIndex, 0, removed)
        
        dispatch({
            type: MOVE_STORY,
            payload: storyMapClone
        })
    }
}

export function addPageToMap(mapKey, itemCount, boardType) {
    return (dispatch, getState) => {
        const { pageRepo } = getState().page
        const { fieldRepo } = getState().field

        const pageKey = helpers.genUID(boardType, pageRepo)

        //set-up defaults
        const fieldsWithDefaults = _.filter(fieldRepo, i => i.boardType === boardType && i.default)
        let defaultInfo = {}
        fieldsWithDefaults.forEach(i => defaultInfo[i.key] = i.default)

        let pageInfo = {
            pageKey,
            boardType,
            storyType: mapKey,
            index: itemCount,
            ...defaultInfo,
        }

        dispatch({
            type: ADD_PAGE,
            payload: pageInfo
        })
        dispatch(showModal(modalType.showPage, { pageKey }))
    }
}

export function movePageWithinMap(mapKey, startIndex, endIndex) {
    return (dispatch, getState) => {
        const { pageRepo } = getState().page
        
        let pageRepoClone = Object.assign({}, pageRepo)

        let relatedPages = _(pageRepo)
            .filter(i => i.storyType === mapKey)
            .sortBy(i => i.index)
        
        const [removed] = relatedPages.splice(startIndex, 1)
        relatedPages.splice(endIndex, 0, removed)
        
        for(var i=0; i<relatedPages.length; i++) {
            pageRepoClone[relatedPages[i].pageKey].index = i
        }

        dispatch({
            type: MOVE_PAGE_WITHIN_MAP,
            payload: pageRepoClone
        })
    }
}

export function movePageToOtherMap(startMapKey, endMapKey, startIndex, endIndex) {
    return (dispatch, getState) => {
        const { pageRepo } = getState().page

        let pageRepoClone = Object.assign({}, pageRepo)

        let startPages = _(pageRepo)
            .filter(i => i.storyType === startMapKey)
            .sortBy(i => i.index)
        let endPages = _(pageRepo)
            .filter(i => i.storyType === endMapKey)
            .sortBy(i => i.index)

        startPages[startIndex].storyType = endMapKey
        const [removed] = startPages.splice(startIndex, 1)
        endPages.splice(endIndex, 0, removed)

        for(var i=0; i<startPages.length; i++) {
            pageRepoClone[startPages[i].pageKey].index = i
        }
        for(var j=0; j<endPages.length; j++) {
            pageRepoClone[endPages[j].pageKey].index = j
        }
    
        dispatch({
            type: MOVE_PAGE_TO_OTHER_MAP,
            payload: pageRepoClone
        })
    }
}

export function removePage(pageKey) {
    return (dispatch, getState) => {
        const { pageRepo } = getState().page
        
        let pageRepoClone = Object.assign({}, pageRepo)
        delete pageRepoClone[pageKey]

        dispatch({
            type: REMOVE_PAGE,
            payload: pageRepoClone
        })
    }
}

export function updatePage(pageKey, field, newValue) {
    return (dispatch, getState) => {
        const { pageRepo } = getState().page
        let pageInfo = {
            ...pageRepo[pageKey],
            [field]: newValue,
        }

        dispatch({
            type: UPDATE_PAGE,
            payload: pageInfo
        })
    }
}

export function updatePageByPath() {
    return (dispatch, getState) => {
        const { pageRepo } = getState().page
        
        const pageInfo = helpers.pathUpdate(arguments, 0, pageRepo)
        if (!pageInfo) return

        dispatch({
            type: UPDATE_PAGE,
            payload: pageInfo
        })
    }
}

/*TODO?????
export function updatePageByProps(props) {
    return (dispatch, getState) => {
        const { pageRepo } = getState().page

        const pageInfo = helpers.pathUpdate()
    }
}*/

export function saveAllPriorities(attach) {
    return (dispatch, getState) => {
        const { pageRepo } = getState().page
        let repoClone = Object.assign({}, pageRepo)

        for (var i=0; i<attach.length; i++) {
            for (var j=0; j<attach[i].length; j++) {
                repoClone[attach[i][j].pageKey].priority = i
            }
        }

        dispatch({
            type: UPDATE_REPO,
            payload: repoClone,
        })
    }
}

export default (state = initialState, action) => {
    switch(action.type){
        case ADD_STORY: 
        case MOVE_STORY:
            return { ...state, storyMap: action.payload }
            
        case UPDATE_REPO:
        case MOVE_PAGE_WITHIN_MAP:
        case MOVE_PAGE_TO_OTHER_MAP:
        case REMOVE_PAGE:
            return { ...state, pageRepo: action.payload }
            
        case ADD_PAGE:
        case UPDATE_PAGE:
            return { ...state, pageRepo: { ...state.pageRepo, [action.payload.pageKey]: action.payload }}
        default:
            return state;
    }
}