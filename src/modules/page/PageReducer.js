import _ from 'lodash'
import * as helpers from '../common/helpers'
import { modalType } from '../modal/types'
import { showModal } from '../modal/ModalReducer';

import { initStoryMap } from './defaults'
import { boardType } from '../fields/defaults'
import { updateSourceType } from '../common/types';

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

export function moveStory(boardKey, startIndex, endIndex) {
    return (dispatch, getState) => {
        const { storyMap } = getState().page
        let storyMapClone = Object.assign({}, storyMap)

        let relatedStories = _(storyMapClone)
            .filter(i => i.boardType === boardKey)
            .sortBy(i => i.index)
            .value()

        const [removed] = relatedStories.splice(startIndex, 1)
        relatedStories.splice(endIndex, 0, removed)

        //re-index
        relatedStories.forEach((i, x) => storyMapClone[i.key].index = x)
        
        dispatch({
            type: MOVE_STORY,
            payload: storyMapClone
        })
    }
}

//TODO itemCount should be replaced because it places the item on BOTTOM, should be on TOP UX
export function addPageToMap(mapKey, itemCount, boardType) {
    return (dispatch, getState) => {
        const { pageRepo } = getState().page
        const { fieldRepo } = getState().field

        let repoClone = Object.assign({}, pageRepo)
        const pageKey = helpers.genUID(boardType, pageRepo)

        //set-up defaults
        let defaultInfo = {}
        _.filter(fieldRepo, i => i.boardType === boardType && i.default)
            .forEach(i => defaultInfo[i.key] = i.default)

        repoClone[pageKey] = {
            pageKey,
            boardType,
            storyType: mapKey,
            index: itemCount,
            ...defaultInfo,
        }

        dispatch({
            type: ADD_PAGE,
            payload: repoClone,
        })
        dispatch(showModal(modalType.showPage, {
            pageKey,
            path: [pageKey],
            updateSource: updateSourceType.repo,
        }))
    }
}

export function movePageWithinMap(mapKey, startIndex, endIndex) {
    return (dispatch, getState) => {
        const { pageRepo } = getState().page
        
        let pageRepoClone = Object.assign({}, pageRepo)

        let relatedPages = _(pageRepo)
            .filter(i => i.storyType === mapKey)
            .sortBy(i => i.index)
            .value()
        
        const [removed] = relatedPages.splice(startIndex, 1)
        relatedPages.splice(endIndex, 0, removed)
        
        //re-index
        relatedPages.forEach((i, x) => pageRepoClone[i.pageKey].index = x)

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
            .value()
        let endPages = _(pageRepo)
            .filter(i => i.storyType === endMapKey)
            .sortBy(i => i.index)
            .value()

        startPages[startIndex].storyType = endMapKey
        const [removed] = startPages.splice(startIndex, 1)
        endPages.splice(endIndex, 0, removed)

        //re-index
        startPages.forEach((i, x) => pageRepoClone[i.pageKey].index = x)
        endPages.forEach((i, x) => pageRepoClone[i.pageKey].index = x)
    
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

export function updateRepo(path, update, extraPath=[]) {
    return (dispatch, getState) => {
        const { pageRepo } = getState().page
        const repoClone = helpers.updateByPath(path.concat(extraPath), update, pageRepo)
        
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
        case MOVE_STORY:
            return { ...state, storyMap: action.payload }
            
        case UPDATE_REPO:
        case MOVE_PAGE_WITHIN_MAP:
        case MOVE_PAGE_TO_OTHER_MAP:
        case ADD_PAGE:
        case REMOVE_PAGE:
            return { ...state, pageRepo: action.payload }
            
        case UPDATE_PAGE:
            return { ...state, pageRepo: { ...state.pageRepo, [action.payload.pageKey]: action.payload }}
        default:
            return state;
    }
}