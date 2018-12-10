import * as helpers from '../common/helpers'
import * as maptool from './logic/maptool'
import { updatePage } from '../page/PageReducer'

import { defaultLogic } from './logic/types'
import { initFieldMap, initFieldRepo } from './defaults'

const initialState = {
    fieldMap: initFieldMap,
    fieldRepo: initFieldRepo,

    defaultLogic,
}

const UPDATE_FIELD = 'field/update-field'

export function updateField(fieldKey, field, newValue) {
    return (dispatch, getState) => {
        const { fieldRepo } = getState().field
        let fieldInfo = {
            ...fieldRepo[fieldKey],
            [field]: newValue,
        }

        dispatch({
            type: UPDATE_FIELD,
            payload: fieldInfo
        })
    }
}

function getLastYChild(key, values) {
    let last = key
    while(values[last].down) {
        last = values[last].down
    }
    return last
}

//deletes key and all children of key. MUTATES.
function recursiveDelete(key, values) {
    if (!key || !values[key]) return
    values[key].right && recursiveDelete(values[key].right, values)
    values[key].down && recursiveDelete(values[key].down, values)
    return delete values[key]
}

export function toggleCollapse(itemKey, pageKey, fieldKey) {
    return (dispatch, getState) => {
        const { pageRepo } = getState().page

        let logicMap = { ...defaultLogic }
        Object.assign(logicMap, pageRepo[pageKey][fieldKey])

        logicMap[itemKey].collapsed = !logicMap[itemKey].collapsed

        dispatch(updatePage(pageKey, fieldKey, logicMap))
    }
}

//LogicBoard functions
export function addItemToRightOf(itemKey, pageKey, fieldKey) {
    return (dispatch, getState) => {
        const { pageRepo } = getState().page
        
        let logicMap = { ...defaultLogic }
        Object.assign(logicMap, pageRepo[pageKey][fieldKey])

        let newItemKey = helpers.genUID('item')
        while(logicMap[newItemKey]) {
            newItemKey = helpers.genUID('item')
        }

        logicMap[newItemKey] = {}
        logicMap[itemKey].right && (logicMap[newItemKey].right = logicMap[itemKey].right)
        logicMap[itemKey].right = newItemKey

        dispatch(updatePage(pageKey, fieldKey, logicMap))
    }
}

export function addItemBelowOf(itemKey, pageKey, fieldKey) {
    return (dispatch, getState) => {
        const { pageRepo } = getState().page

        let logicMap = { ...defaultLogic }
        Object.assign(logicMap, pageRepo[pageKey][fieldKey])

        let newItemKey = helpers.genUID('item')
        while(logicMap[newItemKey]) {
            newItemKey = helpers.genUID('item')
        }
        
        logicMap[newItemKey] = {}
        logicMap[itemKey].down && (logicMap[newItemKey].down = logicMap[itemKey].down)
        logicMap[itemKey].down = newItemKey
        
        dispatch(updatePage(pageKey, fieldKey, logicMap))
    }
}

export function deleteItem(itemKey, pageKey, fieldKey) {
    return (dispatch, getState) => {
        const { pageRepo } = getState().page

        let logicMap = {}
        Object.assign(logicMap, pageRepo[pageKey][fieldKey])

        //re-assign parent logic path
        const { key, type } = maptool.getParent(itemKey, logicMap)
        key && (logicMap[key][type] = logicMap[itemKey].right || logicMap[itemKey].down || null)
        
        //re-assign furthest child in next .right IF removed child has a .down
        if (logicMap[itemKey].right) {
            let keyToChange = getLastYChild(logicMap[itemKey].right, logicMap)
            logicMap[itemKey].down && (logicMap[keyToChange].down = logicMap[itemKey].down)
        }
        
        delete logicMap[itemKey]

        dispatch(updatePage(pageKey, fieldKey, logicMap))
    }
}

export function deleteLogicTree(itemKey, pageKey, fieldKey) {
    return (dispatch, getState) => {
        const { pageRepo } = getState().page

        let logicMap = {}
        Object.assign(logicMap, pageRepo[pageKey][fieldKey])

        //changing the parent relationship
        const { key, type } = maptool.getParent(itemKey, logicMap)

        //if item is main parent
        if (!type && !key) {
            return dispatch(updatePage(pageKey, fieldKey, defaultLogic))
        }

        if (logicMap[itemKey].down) {
            logicMap[key][type] = logicMap[itemKey].down
        } else {
            delete logicMap[key][type]
        }

        //goodbyeChildren
        recursiveDelete(logicMap[itemKey].right, logicMap)
        delete logicMap[itemKey]

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
        const parentKey = maptool.getParent(origin, valueClone).key
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
        case UPDATE_FIELD:
            return { ...state, fieldRepo: { ...state.fieldRepo, [action.payload.fieldKey]: action.payload } }
        default:
            return state;
    }
}