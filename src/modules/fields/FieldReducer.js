import * as helpers from '../common/helpers'
import * as maptool from './logic/maptool'
import _ from 'lodash'
import { updatePage } from '../page/PageReducer'

import { fieldType } from './defaults'
import { defaultLogic } from './logic/types'
import { initFieldMap, initFieldRepo } from './defaults'

const initialState = {
    fieldMap: initFieldMap,
    fieldRepo: initFieldRepo,
    tagRepo: {},
    defaultLogic,
}

const ADD_FIELD = 'field/add-field'
const UPDATE_FIELD = 'field/update-field'
const MOVE_FIELD = 'field/move-field'
const DELETE_FIELD = 'field/delete-field'

const ADD_TAG = 'field/add-tag'
const DELETE_TAG = 'field/delete-tag'
const UPDATE_TAG = 'field/update-tag'
const MOVE_TAG_WITHIN_FIELD = 'field/move-tag-within-field'
const MOVE_TAG_TO_OTHER_FIELD = 'field/move-tag-to-other-field'

export function addField(fieldMapKey, text) {
    return (dispatch, getState) => {
        const { fieldMap, fieldRepo } = getState().field

        let fieldMapClone = {}
        Object.assign(fieldMapClone, fieldMap)
        let fieldRepoClone = {}
        Object.assign(fieldRepoClone, fieldRepo)

        let newItemKey = helpers.genUID('field')
        while(fieldRepo[newItemKey]) {
            newItemKey = helpers.genUID('field')
        }

        fieldMapClone[fieldMapKey].push(newItemKey)
        fieldRepoClone[newItemKey] = {
            fieldKey: newItemKey,
            fieldTitle: text,
            fieldType: fieldType.text
        }

        dispatch({
            type: ADD_FIELD,
            payload: {
                fieldMap: fieldMapClone,
                fieldRepo: fieldRepoClone,
            }
        })
    }
}

export function deleteField(fieldMapKey, fieldKey) {
    return (dispatch, getState) => {
        const { fieldMap, fieldRepo, tagRepo } = getState().field

        let fieldMapClone = {}
        Object.assign(fieldMapClone, fieldMap)
        let fieldRepoClone = {}
        Object.assign(fieldRepoClone, fieldRepo)
        let tagRepoClone = {}
        Object.assign(tagRepoClone, tagRepo)

        _.remove(fieldMapClone[fieldMapKey], i => i === fieldKey)

        if (fieldRepo[fieldKey].data) {
            for (var i=0; i<fieldRepo[fieldKey].data.length; i++) {
                delete tagRepoClone[fieldRepo[fieldKey].data[i]]
            }
        }

        delete fieldRepoClone[fieldKey]

        dispatch({
            type: DELETE_FIELD,
            payload: {
                fieldMap: fieldMapClone,
                fieldRepo: fieldRepoClone,
                tagRepo: tagRepoClone,
            }
        })
    }
}

export function moveField(fieldMapKey, startIndex, endIndex) {
    return (dispatch, getState) => {
        const { fieldMap } = getState().field
        
        let dataClone = Array.from(fieldMap[fieldMapKey])
        let [removed] = dataClone.splice(startIndex, 1)
        dataClone.splice(endIndex, 0, removed)

        dispatch({
            type: MOVE_FIELD,
            payload: {
                key: fieldMapKey,
                data: dataClone
            }
        })
    }
}

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

export function addTag(fieldKey, text) {
    return (dispatch, getState) => {
        const { fieldRepo, tagRepo } = getState().field

        let dataClone = Array.from(fieldRepo[fieldKey].data || [])
        
        let newItemKey = helpers.genUID('tag')
        while(tagRepo[newItemKey]) {
            newItemKey = helpers.genUID('tag')
        }

        dataClone.push(newItemKey)
        
        dispatch(updateField(fieldKey, 'data', dataClone))

        dispatch({
            type: ADD_TAG,
            payload: {
                tagKey: newItemKey,
                title: text
            }
        })
    }
}

export function deleteTag(fieldKey, index) {
    return (dispatch, getState) => {
        const { fieldRepo, tagRepo } = getState().field

        let dataClone = Array.from(fieldRepo[fieldKey].data || [])
        const [removed] = dataClone.splice(index, 1)

        let tagRepoClone = {}
        Object.assign(tagRepoClone, tagRepo)
        delete tagRepoClone[removed]

        dispatch(updateField(fieldKey, 'data', dataClone))

        dispatch({
            type: DELETE_TAG,
            payload: tagRepoClone,
        })
    }
}

export function updateTag(tagKey, field, newValue) {
    return (dispatch, getState) => {
        const { tagRepo } = getState().field
        let tagInfo = {
            ...tagRepo[tagKey],
            [field]: newValue,
        }

        dispatch({
            type: UPDATE_TAG,
            payload: tagInfo
        })
    }
}

export function moveTagWithinField(fieldKey, startIndex, endIndex) {
    return (dispatch, getState) => {
        const { fieldRepo } = getState().field
        
        let dataClone = Array.from(fieldRepo[fieldKey].data)
        let [removed] = dataClone.splice(startIndex, 1)
        dataClone.splice(endIndex, 0, removed)

        dispatch({
            type: MOVE_TAG_WITHIN_FIELD,
            payload: {
                key: fieldKey,
                data: {
                    ...fieldRepo[fieldKey],
                    data: dataClone
                },
            }
        })
    }
}

export function moveTagToOtherField(startFieldKey, endFieldKey, startIndex, endIndex) {
    return (dispatch, getState) => {
        const { fieldRepo } = getState().field

        let fieldRepoClone = {}
        Object.assign(fieldRepoClone, fieldRepo)

        let startFieldData = Array.from(fieldRepoClone[startFieldKey].data)
        let endFieldData = Array.from(fieldRepoClone[endFieldKey].data)
        
        let [removed] = startFieldData.splice(startIndex, 1)
        endFieldData.splice(endIndex, 0, removed)

        fieldRepoClone[startFieldKey].data = startFieldData
        fieldRepoClone[endFieldKey].data = endFieldData

        dispatch({
            type: MOVE_TAG_TO_OTHER_FIELD,
            payload: fieldRepoClone
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
        case ADD_FIELD:
            return { ...state, fieldMap: action.payload.fieldMap, fieldRepo: action.payload.fieldRepo }
        case UPDATE_FIELD:
            return { ...state, fieldRepo: { ...state.fieldRepo, [action.payload.fieldKey]: action.payload } }
        case MOVE_FIELD:
            return { ...state, fieldMap: { ...state.fieldMap, [action.payload.key]: action.payload.data }}
        case DELETE_FIELD:
            return { ...state, ...action.payload }

        case ADD_TAG:
            return { ...state, tagRepo: { ...state.tagRepo, [action.payload.tagKey]: action.payload }}
        case DELETE_TAG:
            return { ...state, tagRepo: action.payload }
        case UPDATE_TAG:
            return { ...state, tagRepo: { ...state.tagRepo, [action.payload.tagKey]: action.payload }}
        case MOVE_TAG_WITHIN_FIELD:
            return { ...state, fieldRepo: { ...state.fieldRepo, [action.payload.key]: action.payload.data }}
        case MOVE_TAG_TO_OTHER_FIELD:
            return { ...state, fieldRepo: action.payload }
        default:
            return state;
    }
}