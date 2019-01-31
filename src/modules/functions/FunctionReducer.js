import _ from 'lodash'
import { initFunctionMap } from "../page/defaults";

const initialState = {
    functionRepo: {},
    functionMap: initFunctionMap,
}

const MOVE_STORY = 'functions/move-story'

export function moveFunctionStory(startIndex, endIndex) {
    return (dispatch, getState) => {
        const { functionMap } = getState().functions
        let functionMapClone = Object.assign({}, functionMap)

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

export default (state = initialState, action) => {
    switch(action.type){
        case MOVE_STORY:
            return { ...state, functionMap: action.payload }
        default:
            return state;
    }
}