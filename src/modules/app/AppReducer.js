import { droppableType } from '../common/types'

import { moveStory, movePageWithinMap, movePageToOtherMap } from '../page/PageReducer'
import { moveFunctionStory } from '../functions/FunctionReducer'
import {
    moveLogic,
    moveField,
    moveTagWithinField,
} from '../fields/FieldReducer'

const initialState = {
    preferences: {},
}

const SET_PREFERENCE = 'app/set-preference'

export function handleDragEnd(source, destination) {
    return (dispatch) => {
        const sources = source.droppableId.split('.')
        const dests = destination.droppableId.split('.')

        switch(sources[0]) {
            case droppableType.board:
                dispatch(moveStory(sources[1], source.index, destination.index))
                break
            case droppableType.functionBoard:
                dispatch(moveFunctionStory(source.index, destination.index))
                break
            case droppableType.logic:
                if (source.droppableId === destination.droppableId) {
                    dispatch(moveLogic(
                        sources[1],
                        sources[2],
                        sources[3],
                        source.index,
                        destination.index,
                    ))
                } 
                break
            case droppableType.template:
                if (source.droppableId === destination.droppableId) {
                    dispatch(moveField(
                        sources[1],
                        source.index,
                        destination.index,
                    ))
                }
                break
            case droppableType.tag:
                dispatch(moveTagWithinField(
                    sources[1],
                    source.index,
                    destination.index,
                ))
                break
            case droppableType.page:
                if (source.droppableId === destination.droppableId) {
                    dispatch(movePageWithinMap(
                        sources[1],
                        source.index,
                        destination.index,
                    ))
                } else {
                    dispatch(movePageToOtherMap(
                        sources[1],
                        dests[1],
                        source.index,
                        destination.index,
                    ))
                }
                break
            default:
                return;
        }
    }
}

export default (state = initialState, action) => {
    switch(action.type){
        case SET_PREFERENCE:
            return { ...state, preferences: action.payload }
        default:
            return state;
    }
}