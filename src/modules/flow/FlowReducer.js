import * as helpers from '../common/helpers'
import { modalType } from '../modal/modalConfig'
import { showModalByKey } from '../modal/ModalReducer';

const initialState = {
    storyMap: [
        {
            key: 'main',
            title: 'Main',
            palette: 'palette-yellow',
            default: true,
        },
        {
            key: 'unique',
            title: 'Unique',
            palette: 'palette-blue',
            default: true,
        },
        {
            key: 'endState',
            title: 'End State',
            palette: 'palette-blue',
            default: true,
        },
    ],

    flowData: {
        main: [],
        unique: [],
        endState: [],
    },

    defaultInfo: {},
}

const ADD_NEW_STORY = 'flow/add-new-story'
const ADD_NEW_PHASE = 'flow/add-new-phase'
const DELETE_STORY = 'flow/delete-story'

const MOVE_STORY = 'flow/move-story'

export function moveStory(startIndex, endIndex) {
    return (dispatch, getState) => {
        const { storyMap } = getState().flow
        let storyMapClone = Array.from(storyMap)

        const [removed] = storyMapClone.splice(startIndex, 1)
        storyMapClone.splice(endIndex, 0, removed)
        
        dispatch({
            type: MOVE_STORY,
            payload: storyMapClone
        })
    }
}

export function addNewPhase(info = {}) {
    return(dispatch, getState) => {
        const { pageRepo } = getState().page

        let pageKey = helpers.genUID('phase')
        while(pageRepo[pageKey]) {
            pageKey = helpers.genUID('phase')
        }

        let pageInfo = {
            ...info,
            pageKey,
        }
        
        dispatch({
            type: ADD_NEW_PHASE,
            payload: pageInfo
        })

        dispatch(showModalByKey(modalType.showPage, { pageKey }))
    }
}

export function addFlowStory(text) {
    return (dispatch, getState) => {
        const { flowData } = getState().flow
        let textNoSpace = text.replace(/\s/g, '').toLowerCase()
        let textUID = helpers.genUID(textNoSpace)

        while(flowData[textUID]) {
            textUID = helpers.genUID(textNoSpace)
        }

        let flow = {
            key: textUID,
            title: text,
            palette: 'light-grey',
            default: false,
        }

        dispatch({
            type: ADD_NEW_STORY,
            payload: {
                uid: textUID,
                flow,
            }
        })
    }
}

export function deleteStory(storyIndex) {
    return (dispatch, getState) => {
        const { flow, flowData } = getState().flow
        let flowClone = Array.from(flow)
        let flowDataClone = {}
        Object.assign(flowDataClone, flowData)
        
        let storyId = flowClone[storyIndex].key
        flowClone.splice(storyIndex, 1)
        delete flowDataClone[storyId]
        
        dispatch({
            type: DELETE_STORY,
            payload: {
                flow: flowClone,
                flowData: flowDataClone,
            }
        })
    }
}

export default (state = initialState, action) => {
    switch(action.type){
        case ADD_NEW_PHASE:
            return { ...state, flowData: { ...state.flowData, [action.payload.phaseStoryKey] : [ action.payload.pageKey, ...state.flowData[action.payload.phaseStoryKey]] } }
        case ADD_NEW_STORY:
            return { ...state, flow: [ ...state.flow, action.payload.story ],
                flowData: { ...state.flowData, [action.payload.uid]: [] } }
        case DELETE_STORY:
            return { ...state, flow: action.payload.flow, flowData: action.payload.flowData }

        case MOVE_STORY:
            return { ...state, storyMap: action.payload }
        default:
            return state;
    }
}