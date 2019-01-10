import _ from 'lodash'
import * as helpers from '../common/helpers'
import { modalType } from '../modal/types'
import { showModal } from '../modal/ModalReducer';

import { initStoryMap, initBoardRepo } from './defaults'

const initialState = {
    storyMap: initStoryMap,
    boardRepo: initBoardRepo,
    pageRepo: {},
}

//storyMap:
const ADD_STORY = 'story/add-story-to'
const MOVE_STORY = 'story/move-story'
const MOVE_PAGE_WITHIN_MAP = 'page/move-page-within-map'
const MOVE_PAGE_TO_OTHER_MAP = 'page/move-page-to-other-map'

//[repo]sitory: holds all the pages keyed by pageKey
const ADD_PAGE_TO_REPO = 'page/add-page'
const REMOVE_PAGE = 'page/remove-page'
const UPDATE_PAGE = 'page/update-page'

export function addStory(title, boardType) {
    return (dispatch, getState) => {
        const { storyMap } = getState().page

        let storyKey = helpers.genUID('story')
        while(storyMap[storyKey]) {
            storyKey = helpers.genUID('story')
        }

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

        let pageKey = helpers.genUID('phase')
        while(pageRepo[pageKey]) {
            pageKey = helpers.genUID('phase')
        }

        let pageInfo = {
            pageKey,
            boardType,
            storyType: mapKey,
            index: itemCount,
        }

        dispatch({
            type: ADD_PAGE_TO_REPO,
            payload: pageInfo
        })
        dispatch(showModal(modalType.showPage, { pageKey }))
    }
}

export function movePageWithinMap(mapKey, startIndex, endIndex) {
    return (dispatch, getState) => {
        const { pageRepo } = getState().page
        
        let pageRepoClone = Object.assign({}, pageRepo)

        let relatedPages = _.filter(pageRepo, i => i.storyType === mapKey)
        relatedPages = _.sortBy(relatedPages, i => i.index)
        
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

        let startPages = _.filter(pageRepo, i => i.storyType === startMapKey)
        startPages = _.sortBy(startPages, i => i.index)
        let endPages = _.filter(pageRepo, i => i.storyType === endMapKey)
        endPages = _.sortBy(endPages, i => i.index)

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

export function addPageToRepo(obj) {
    return (dispatch) => {
        dispatch({
            type: ADD_PAGE_TO_REPO,
            payload: obj
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

export default (state = initialState, action) => {
    switch(action.type){
        case ADD_STORY: 
        case MOVE_STORY:
            return { ...state, storyMap: action.payload }
            
        case MOVE_PAGE_WITHIN_MAP:
        case MOVE_PAGE_TO_OTHER_MAP:
        case REMOVE_PAGE:
            return { ...state, pageRepo: action.payload }
            
        case ADD_PAGE_TO_REPO:
        case UPDATE_PAGE:
            return { ...state, pageRepo: { ...state.pageRepo, [action.payload.pageKey]: action.payload }}
        default:
            return state;
    }
}