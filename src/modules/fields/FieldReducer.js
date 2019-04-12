import * as helpers from '../common/helpers'
import * as maptool from '../logic/maptool'
import _ from 'lodash'

import { fieldType, boardType as _boardType } from './defaults'

import { updateRepo } from '../page/PageReducer'

const initialState = {}

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
        let relatedRepo = _(fieldRepo)
            .filterBy(i => i.boardType === boardTarget)
            .sortBy(i => i.index)
            .value()
        
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
        let relatedRepo = _(fieldRepo)
            .filter(i => i.boardType === boardType)
            .sortBy(i => i.index)
            .value()

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

export function updateField(path, update) {
    return (dispatch, getState) => {
        const { fieldRepo } = getState().field
        
        const repoClone = helpers.updateByPath(path, update, fieldRepo)

        dispatch({
            type: UPDATE_FIELD,
            payload: repoClone,
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
        
        dispatch(updateField([fieldKey, 'data'], dataClone))
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

        dispatch(updateField([fieldKey, 'data'], dataClone))
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
        
        dispatch(updateField([fieldKey, 'data'], dataClone))
    }
}

export function moveTagToOtherField(startFieldKey, endFieldKey, startIndex, endIndex) {
    return (dispatch, getState) => {
        const { fieldRepo } = getState().field

        let fieldRepoClone = Object.assign({}, fieldRepo)

        let startFieldData = _.cloneDeep(fieldRepoClone[startFieldKey].data)
        let endFieldData = _.cloneDeep(fieldRepoClone[endFieldKey].data)
        
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
        
        dispatch(updateRepo([pageKey, fieldKey], valueClone))
    }
}

//Role priority sort
export function sortPriorities(pageRepo) {
    return _(pageRepo)
        .filter(i => i && i.boardType === _boardType.roles.key)
        .groupBy(i => i.priority)
        .sortBy((i, k) => k)
        .value()
}

export default (state = initialState, action) => {
    switch(action.type){
        case ADD_FIELD:
        case UPDATE_FIELD:
            return { ...state, fieldRepo: action.payload }
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