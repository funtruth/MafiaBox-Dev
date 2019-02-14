import _ from 'lodash'
import * as helpers from '../common/helpers'
import { initFunctionMap } from "../page/defaults";

import { modalType } from '../modal/types'

import { showModal } from '../modal/ModalReducer'

const initialState = {
    functionRepo: {},
    functionMap: initFunctionMap,
}

const MOVE_STORY = 'functions/move-story'
const ADD_FUNCTION = 'functions/add-function'
const UPDATE_FUNCTION = 'functions/update-function'

export function moveFunctionStory(startIndex, endIndex) {
    return (dispatch, getState) => {
        const { functionMap } = getState().functions
        let functionMapClone = Object.assign({}, functionMap)

        //TODO probably can reduce
        let relatedStories = _.sortBy(functionMapClone, i => i.index)

        const [removed] = relatedStories.splice(startIndex, 1)
        relatedStories.splice(endIndex, 0, removed)

        //re-index
        relatedStories.forEach((i, x) => functionMapClone[i.key].index = x)
        
        dispatch({
            type: MOVE_STORY,
            payload: functionMapClone,
        })
    }
}

export function addFunction(mapKey, itemCount, boardType) {
    return (dispatch, getState) => {
        const { functionRepo } = getState().functions
        const { fieldRepo } = getState().field

        let repoClone = Object.assign({}, functionRepo)
        const pageKey = helpers.genUID(boardType, functionRepo)

        //set-up defaults
        let defaultInfo = {}
        _.filter(fieldRepo, i => i.boardType === boardType && i.default)
            .forEach(i => defaultInfo[i.key] = i.default)

        repoClone[pageKey] = {
            ...defaultInfo,
            pageKey,
            boardType,
            storyType: mapKey,
            index: itemCount,
        }

        dispatch({
            type: ADD_FUNCTION,
            payload: repoClone,
        })
        dispatch(showModal(modalType.showFunctionPage, { pageKey }))
    }
}

export function updateFunction() {
    return (dispatch, getState) => {
        const { functionRepo } = getState().functions
        
        const pageInfo = helpers.pathUpdate(arguments, 0, functionRepo)
        if (!pageInfo) return

        dispatch({
            type: UPDATE_FUNCTION,
            payload: pageInfo
        })
    }
}

export default (state = initialState, action) => {
    switch(action.type){
        case MOVE_STORY:
            return { ...state, functionMap: action.payload }
        case ADD_FUNCTION:
            return { ...state, functionRepo: action.payload }
        case UPDATE_FUNCTION:
            return { ...state, functionRepo: { ...state.functionRepo, [action.payload.pageKey]: action.payload }}
        default:
            return state;
    }
}