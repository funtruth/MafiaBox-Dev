import _ from 'lodash'

import { modalType } from '../common/types';

import { showModal } from '../modal/ModalReducer'
import { updateByPath } from '../common/helpers';

const initialState = {
    functionRepo: {},
    functionMap: {},
}

const MOVE_STORY = 'functions/move-story'
const ADD_FUNCTION = 'functions/add-function'
const UPDATE_REPO = 'functions/update-repo'

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
        const { fieldRepo } = getState().page

        let repoClone = Object.assign({}, functionRepo)
        const pageKey = 'TODO'

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
        dispatch(showModal(modalType.showFunctionPage, {
            pageKey,
            path: [pageKey],
        }))
    }
}

export function updateFunction(path, update) {
    return (dispatch, getState) => {
        const { functionRepo } = getState().functions
        
        const repoClone = updateByPath(path, update, functionRepo)

        dispatch({
            type: UPDATE_REPO,
            payload: repoClone,
        })
    }
}

export default (state = initialState, action) => {
    switch(action.type){
        case MOVE_STORY:
            return { ...state, functionMap: action.payload }
        case ADD_FUNCTION:
        case UPDATE_REPO:
            return { ...state, functionRepo: action.payload }
        default:
            return state;
    }
}