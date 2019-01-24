import * as helpers from '../common/helpers'
import * as maptool from '../logic/maptool'
import _ from 'lodash'
import { updatePage } from '../page/PageReducer'

import { fieldType } from './defaults'
import { defaultLogic } from '../logic/types'
import { initFieldRepo } from './defaults'

const initialState = {
    fieldRepo: initFieldRepo,
}

const ADD_FIELD = 'field/add-field'
const UPDATE_FIELD = 'field/update-field'
const MOVE_FIELD = 'field/move-field'
const DELETE_FIELD = 'field/delete-field'

const MOVE_TAG_TO_OTHER_FIELD = 'field/move-tag-to-other-field'

export function addField(boardType, text) {
    return (dispatch, getState) => {
        const { fieldRepo } = getState().field

        //get index of new field, equal to length of existing fields
        const index = _.filter(fieldRepo, i => i.boardType === boardType).length
        
        let fieldRepoClone = Object.assign({}, fieldRepo)
        const newItemKey = helpers.genUID('field', fieldRepo)

        fieldRepoClone[newItemKey] = {
            key: newItemKey,
            fieldKey: newItemKey,
            title: text,
            fieldType: fieldType.text.key,
            boardType,
            index,
        }

        dispatch({
            type: ADD_FIELD,
            payload: fieldRepoClone,
        })
    }
}

export function deleteField(fieldKey) {
    return (dispatch, getState) => {
        const { fieldRepo } = getState().field

        //get the affected boardType
        const boardTarget = fieldRepo[fieldKey].boardType

        //get items in fieldRepo that may be affected
        let relatedRepo = _.filterBy(fieldRepo, i => i.boardType === boardTarget)
        relatedRepo = _.sortBy(relatedRepo, i => i.index)
        
        //remove the deleted field, re-index, and re-key (into object)
        _.remove(relatedRepo, i => i.key === fieldKey)
        relatedRepo.map((item, index) => item.index = index)
        const repoClone = _.keyBy(relatedRepo, i => i.key)

        dispatch({
            type: DELETE_FIELD,
            payload: {
                ...fieldRepo,
                ...repoClone,
            }
        })
    }
}

export function moveField(boardType, startIndex, endIndex) {
    return (dispatch, getState) => {
        const { fieldRepo } = getState().field
        
        //get items in fieldRepo that may be affected
        let relatedRepo = _.filter(fieldRepo, i => i.boardType === boardType)
        relatedRepo = _.sortBy(relatedRepo, i => i.index)

        //move the item within the array
        const [removed] = relatedRepo.splice(startIndex, 1)
        relatedRepo.splice(endIndex, 0, removed)

        //re-index and turn back into an object
        relatedRepo.map((item, index) => item.index = index)
        const repoClone = _.keyBy(relatedRepo, i => i.key)

        dispatch({
            type: MOVE_FIELD,
            payload: {
                ...fieldRepo,
                ...repoClone,
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

export function updateFieldByPath() {
    return (dispatch, getState) => {
        const { fieldRepo } = getState().field
        
        const fieldInfo = helpers.pathUpdate(arguments, 0, fieldRepo)
        if (!fieldInfo) return

        dispatch({
            type: UPDATE_FIELD,
            payload: fieldInfo
        })
    }
}

export function addTag(fieldKey, text) {
    return (dispatch, getState) => {
        const { fieldRepo } = getState().field

        //clone data field for tags
        let dataClone = Object.assign({}, fieldRepo[fieldKey].data)

        //calculate new item index
        const index = Object.keys(dataClone).length
        const newItemKey = helpers.genUID('tag', dataClone)

        dataClone[newItemKey] = {
            key: newItemKey,
            title: text,
            index,
        }
        
        dispatch(updateField(fieldKey, 'data', dataClone))
    }
}

export function deleteTag(fieldKey, tagKey) {
    return (dispatch, getState) => {
        const { fieldRepo } = getState().field

        //clone tags data and delete tag
        let dataClone = Object.assign({}, fieldRepo[fieldKey].data)
        delete dataClone[tagKey]

        //re-index
        _.sortBy(dataClone, i => i.index)
            .map((item, index) => dataClone[item.key].index = index)

        dispatch(updateField(fieldKey, 'data', dataClone))
    }
}

export function moveTagWithinField(fieldKey, startIndex, endIndex) {
    return (dispatch, getState) => {
        const { fieldRepo } = getState().field
        
        let dataClone = Object.assign({}, fieldRepo[fieldKey].data)

        //relocate tag
        let dataSorted = _.sortBy(dataClone, i => i.index)
        const [removed] = dataSorted.splice(startIndex, 1)
        dataSorted.splice(endIndex, 0, removed)

        //re-index and assign keys
        dataSorted.map((item, index) => item.index = index)
        dataClone = _.keyBy(dataSorted, i => i.key)
        
        dispatch(updateFieldByPath(fieldKey, 'data', dataClone))
    }
}

export function moveTagToOtherField(startFieldKey, endFieldKey, startIndex, endIndex) {
    return (dispatch, getState) => {
        const { fieldRepo } = getState().field

        let fieldRepoClone = Object.assign({}, fieldRepo)

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

/* Deliverables:
    1. sourceItem
        a. assign dir to newItem
    2. newItem
        a. assign a source (sourceItem)
        b. assign a sourceDir (sourceItem)
        c. assign a dir towards affectedItem
    3. affectedItem
        a. assign a source (newItem)
*/
export function addItem(pageKey, fieldKey, itemKey, dir = 'down') {
    return (dispatch, getState) => {
        const { pageRepo } = getState().page
        
        let logicMap = Object.assign({}, pageRepo[pageKey][fieldKey])
        const newItemKey = helpers.genUID('item', logicMap)

        if (!logicMap[itemKey]) {
            return console.warn('Item does not exist. FieldReducer js.244')
        }
        
        logicMap[newItemKey] = {
            source: itemKey, //2a
            sourceDir: dir, //2b
        }

       if (logicMap[itemKey][dir]) {
            logicMap[newItemKey][dir] = logicMap[itemKey][dir] //2c
            logicMap[logicMap[itemKey][dir]].source = newItemKey //3a
        }

        logicMap[itemKey][dir] = newItemKey //1a

        dispatch(updatePage(pageKey, fieldKey, logicMap))
    }
}

/* Deliverables:
    1. sourceItem
        a. assign a dir (deletedItem.sourceDir) towards (rightOfDeletedItem || downOfDeletedItem)
    2. deletedItem
        a. delete the item (deletedItem)
    3. rightOfDeletedItem
        a. assign a source (sourceItem)
        b. assign a sourceDir (deletedItem.sourceDir)
    4. downOfDeletedItem
        a. assign a source
            1. if (rightOfDeletedItem) bottomOfRightOfDeletedItem
            2. else sourceItem
        b. assign a sourceDir
            1. if (rightOfDeletedItem) [does not change]
            2. else deletedItem.sourceDir
    5. bottomOfRightOfDeletedItem (can be rightOfDeletedItem)
        a. assign a down dir towards downOfDeletedItem (if downOfDeletedItem exists)
*/
export function deleteItem(pageKey, fieldKey, itemKey) {
    return (dispatch, getState) => {
        const { pageRepo } = getState().page

        let logicMap = Object.assign({}, pageRepo[pageKey][fieldKey])

        const { source, sourceDir } = logicMap[itemKey]
        if (!source || !sourceDir) {
            return console.warn('There is something wrong. deleteItem, FieldReducer 276.js')
        }

        logicMap[source][sourceDir] = logicMap[itemKey].right || logicMap[itemKey].down || null //1a

        if (logicMap[itemKey].right) {
            logicMap[logicMap[itemKey].right].source = source //3a
            logicMap[logicMap[itemKey].right].sourceDir = sourceDir //3b

            const bottomOfRightOfDeletedItem = getLastYChild(logicMap[itemKey].right, logicMap)
            if (logicMap[itemKey].down) {
                logicMap[logicMap[itemKey].down].source = bottomOfRightOfDeletedItem //4a1, 4b1
                logicMap[bottomOfRightOfDeletedItem].down = logicMap[itemKey].down //5a
            }
        } else {
            if (logicMap[itemKey].down) {
                logicMap[logicMap[itemKey].down].source = source //4a2
                logicMap[logicMap[itemKey].down].sourceDir = logicMap[itemKey].sourceDir //4b2
            }
        }

        delete logicMap[itemKey] //2a

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
        
        let valueClone = Object.assign({}, pageRepo[pageKey][fieldKey])
        
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
            return { ...state, fieldRepo: action.payload }
        case UPDATE_FIELD:
            return { ...state, fieldRepo: { ...state.fieldRepo, [action.payload.key]: action.payload } }
        case MOVE_FIELD:
            return { ...state, fieldRepo: action.payload }
        case DELETE_FIELD:
            return { ...state, ...action.payload }

        case MOVE_TAG_TO_OTHER_FIELD:
            return { ...state, fieldRepo: action.payload }
        default:
            return state;
    }
}