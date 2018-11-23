import * as helpers from '../common/helpers'
import { updatePage } from '../page/PageReducer'

import { defaultLogic } from '../fields/logic/types'
import { initFieldMap, initFieldRepo } from './defaults'

const initialState = {
    fieldMap: initFieldMap,
    fieldRepo: initFieldRepo,

    defaultLogic,
}

const parentType = {
    v: 'parentType/v',
    h: 'parentType/h',
}

function getParent(key, values) {
    for (var logicKey in values) {
        if (values[logicKey].right === key) {
            return {
                key: logicKey,
                type: parentType.h,
            }
        } else if (values[logicKey].down === key) {
            return {
                key: logicKey,
                type: parentType.v,
            }
        }
    }
    return {
        key: null,
        type: null,
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

        dispatch(updatePage(pageKey, fieldKey, logicMap))
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
        
        dispatch(updatePage(pageKey, fieldKey, logicMap))
    }
}

export function deleteItem(itemKey, pageKey, fieldKey) {
    return (dispatch, getState) => {
        const { pageRepo } = getState().page

        let logicMap = {}
        Object.assign(logicMap, pageRepo[pageKey][fieldKey])

        let objectRight = logicMap[itemKey].right
        let objectDown = logicMap[itemKey].down
        
        for (var key in logicMap) {
            //TODO
        }

        dispatch(updatePage(pageKey, fieldKey, logicMap))
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

        dispatch(updatePage(pageKey, fieldKey, logicMap))
    }
}

export function moveLogic(pageKey, fieldKey, origin, startIndex, endIndex) {
    return (dispatch, getState) => {
        const { pageRepo } = getState().page
        let valueClone = {}
        Object.assign(valueClone, pageRepo[pageKey][fieldKey])
        
        //make array of all rows
        let rows = [origin]
        let pointer = origin
        while(valueClone[pointer].down) {
            pointer = valueClone[pointer].down
            rows.push(pointer)
        }
        
        //swap indexes based on dnd promises
        const [removed] = rows.splice(startIndex, 1)
        rows.splice(endIndex, 0, removed)

        //re-assign previous column .right prop in case the first item has been modified
        const parentKey = getParent(origin, valueClone).key
        parentKey && (valueClone[parentKey].right = rows[0])

        //re-assign items in column .down props
        for (var i=0; i<rows.length - 1; i++) {
            valueClone[rows[i]].down = rows[i + 1]
        }
        //delete down prop from last item
        delete valueClone[rows[rows.length - 1]].down
        
        dispatch(updatePage(pageKey, fieldKey, valueClone))
    }
}

export default (state = initialState, action) => {
    switch(action.type){
        default:
            return state;
    }
}