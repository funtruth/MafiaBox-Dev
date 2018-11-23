import * as helpers from '../common/helpers'
import { modalType } from '../modal/modalConfig'
import { showModalByKey } from '../modal/ModalReducer';

import { initStoryMap } from './defaults'
import { defaultLogic } from '../fields/logic/types'

const initialState = {
    storyMap: initStoryMap,
    pageMap: {},
    pageRepo: {},
}

//storyMap:
const ADD_STORY = 'story/add-story-to'
const MOVE_STORY = 'story/move-story'

//pageMap: maps which pageKeys are in each mapKey
const ADD_PAGE_TO_MAP = 'page/add-page-to-map'
const MOVE_PAGE_WITHIN_MAP = 'page/move-page-within-map'
const MOVE_PAGE_TO_OTHER_MAP = 'page/move-page-to-other-map'

//[repo]sitory: holds all the pages keyed by pageKey
const ADD_PAGE_TO_REPO = 'page/add-page'
const REMOVE_PAGE = 'page/remove-page'
const UPDATE_PAGE = 'page/update-page'

//Logicboard
const ADD_ITEM_LOGIC = 'page/add-item-logic'
const DELETE_LOGIC_ITEM = 'page/delete-logic-item'
const MOVE_LOGIC = 'page/move-logic'

export function addStory(title, boardType) {
    return (dispatch, getState) => {
        const { storyMap, pageMap } = getState().page

        let storyKey = helpers.genUID('story')
        while(pageMap[storyKey]) {
            storyKey = helpers.genUID('story')
        }

        let storyMapClone = Array.from(storyMap)
        storyMapClone.push({
            key: storyKey,
            title,
            boardType,
            default: false,
        })

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

export function addPageToMap(mapKey, boardType) {
    return (dispatch, getState) => {
        const { pageMap, pageRepo } = getState().page

        let pageKey = helpers.genUID('phase')
        while(pageRepo[pageKey]) {
            pageKey = helpers.genUID('phase')
        }

        let mapInfo = Array.from(pageMap[mapKey] || [])
        mapInfo.unshift(pageKey)

        let pageInfo = {
            pageKey,
            boardType,
        }

        dispatch({
            type: ADD_PAGE_TO_REPO,
            payload: pageInfo
        })

        dispatch({
            type: ADD_PAGE_TO_MAP,
            payload: { mapKey, mapInfo }
        })
        
        dispatch(showModalByKey(modalType.showPage, { pageKey }))
    }
}

export function movePageWithinMap(mapKey, startIndex, endIndex) {
    return (dispatch, getState) => {
        const { pageMap } = getState().page
        let mapInfo = Array.from(pageMap[mapKey])

        const [removed] = mapInfo.splice(startIndex, 1);
        mapInfo.splice(endIndex, 0, removed);

        dispatch({
            type: MOVE_PAGE_WITHIN_MAP,
            payload: {
                mapKey,
                mapInfo,
            }
        })
    }
}

export function movePageToOtherMap(startMapKey, endMapKey, startIndex, endIndex) {
    return (dispatch, getState) => {
        const { pageMap } = getState().page
        const startMapClone = Array.from(pageMap[startMapKey])
        const endMapClone = Array.from(pageMap[endMapKey] || [])
        const [removed] = startMapClone.splice(startIndex, 1);
        endMapClone.splice(endIndex, 0, removed);
    
        const result = {};
        result[startMapKey] = startMapClone;
        result[endMapKey] = endMapClone;
    
        dispatch({
            type: MOVE_PAGE_TO_OTHER_MAP,
            payload: result
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
        let pageRepoClone = {}
        
        Object.assign(pageRepoClone, pageRepo)
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

//LogicBoard functions
export function addItemToRightOf(itemKey, pageKey, fieldKey) {
    return (dispatch, getState) => {
        const { pageRepo } = getState().page

        let logicMap = defaultLogic
        Object.assign(logicMap, pageRepo[pageKey][fieldKey])

        let newItemKey = helpers.genUID('phase')
        while(logicMap[newItemKey]) {
            newItemKey = helpers.genUID('phase')
        }

        logicMap[newItemKey] = { right: logicMap[itemKey].right }
        logicMap[itemKey] = { ...logicMap[itemKey], right: newItemKey }

        dispatch({
            type: ADD_ITEM_LOGIC,
            payload: {
                pageKey: pageKey,
                field: fieldKey,
                value: logicMap,
            }
        })
    }
}

export function addItemBelowOf(itemKey, pageKey, fieldKey) {
    return (dispatch, getState) => {
        const { pageRepo } = getState().page

        let logicMap = defaultLogic
        Object.assign(logicMap, pageRepo[pageKey][fieldKey])

        let newItemKey = helpers.genUID('phase')
        while(logicMap[newItemKey]) {
            newItemKey = helpers.genUID('phase')
        }

        logicMap[newItemKey] = { down: logicMap[itemKey].down }
        logicMap[itemKey] = { ...logicMap[itemKey], down: newItemKey }
        
        dispatch({
            type: ADD_ITEM_LOGIC,
            payload: {
                pageKey: pageKey,
                field: fieldKey,
                value: logicMap,
            }
        })
    }
}

export function deleteLogicItem(itemKey, pageKey, fieldKey) {
    return (dispatch, getState) => {
        const { pageRepo } = getState().page

        let logicMap = {}
        Object.assign(logicMap, pageRepo[pageKey][fieldKey])

        let objectRight = logicMap[itemKey].right
        let objectDown = logicMap[itemKey].down
        
        for (var key in logicMap) {
            //TODO
        }

        dispatch({
            type: DELETE_LOGIC_ITEM,
            payload: {
                field: fieldKey,
                value: logicMap,
            }
        })
    }
}

export function deleteLogicTree(itemKey, pageKey, fieldKey) {
    return (dispatch, getState) => {
        const { pageRepo } = getState().page

        let logicMap = {}
        Object.assign(logicMap, pageRepo[pageKey][fieldKey])

        let objectRight = logicMap[itemKey].right
        let objectDown = logicMap[itemKey].down
        
        for (var key in logicMap) {
            //TODO
        }

        dispatch({
            type: DELETE_LOGIC_ITEM,
            payload: {
                field: fieldKey,
                value: logicMap,
            }
        })
    }
}

export function moveLogic(pageKey, fieldKey, origin, startIndex, endIndex) {
    return (dispatch, getState) => {
        const { pageRepo } = getState().page
        let valueClone = {}
        Object.assign(valueClone, pageRepo[pageKey][fieldKey])
        
        let rows = [origin]
        let pointer = origin

        while(valueClone[pointer].down) {
            pointer = valueClone[pointer].down
            rows.push(pointer)
        }
        
        const [removed] = rows.splice(startIndex, 1)
        rows.splice(endIndex, 0, removed)

        for (var i=0; i<rows.length - 1; i++) {
            valueClone[rows[i]].down = rows[i + 1]
        }
        delete valueClone[rows[rows.length - 1]].down
        
        dispatch({
            type: MOVE_LOGIC,
            payload: {
                pageKey,
                field: fieldKey,
                value: valueClone
            }
        })
    }
}

export default (state = initialState, action) => {
    switch(action.type){
        case ADD_STORY: 
            return { ...state, storyMap: action.payload }
        case MOVE_STORY:
            return { ...state, storyMap: action.payload }
            
        case ADD_PAGE_TO_MAP:
            return { ...state, pageMap: { ...state.pageMap, [action.payload.mapKey]: action.payload.mapInfo } }
        case MOVE_PAGE_WITHIN_MAP:
            return { ...state, pageMap: { ...state.pageMap, [action.payload.mapKey]: action.payload.mapInfo } }
        case MOVE_PAGE_TO_OTHER_MAP:
            return { ...state, pageMap: { ...state.pageMap, ...action.payload } }
        
        case ADD_PAGE_TO_REPO:
            return { ...state, pageRepo: { ...state.pageRepo, [action.payload.pageKey]: action.payload }}
        case REMOVE_PAGE:
            return { ...state, pageRepo: action.payload }
        case UPDATE_PAGE:
            return { ...state, pageRepo: { ...state.pageRepo, [action.payload.pageKey]: action.payload }}

        case ADD_ITEM_LOGIC:
            return { ...state, pageRepo: { ...state.pageRepo, [action.payload.pageKey]: 
                { ...state.pageRepo[action.payload.pageKey], [action.payload.field]: action.payload.value } }}
        case DELETE_LOGIC_ITEM:
            return { ...state, pageRepo: { ...state.pageRepo, [action.payload.field]: action.payload.value }}
        case MOVE_LOGIC:
            return { ...state, pageRepo: { ...state.pageRepo, [action.payload.pageKey]: 
                { ...state.pageRepo[action.payload.pageKey], [action.payload.field]: action.payload.value }}}
        default:
            return state;
    }
}