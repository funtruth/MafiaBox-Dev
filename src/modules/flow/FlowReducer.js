import * as helpers from '../roles/helpers'

const initialState = {
    flow: [
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
    ],

    flowData: {
        main: [],
        unique: [],
    },

    flowInfo: {},
}

const REORDER_STORY = 'flow/reorder-story'
const REORDER_ITEM = 'flow/reorder-item'
const RELOCATE_ITEM = 'flow/relocate-item'

const ADD_NEW_STORY = 'flow/add-new-story'
const ADD_PHASE_TO_STORY = 'flow/add-phase-to-story'
const DELETE_STORY = 'flow/delete-story'

export function reorderStory(items) {
    return (dispatch) => {
        dispatch({
            type: REORDER_STORY,
            payload: items
        })
    }
}

export function reorderItem(key, items) {
    return (dispatch) => {
        dispatch({
            type: REORDER_ITEM,
            payload: {
                key,
                items
            }
        })
    }
}

export function relocateItem(result) {
    return (dispatch, getState) => {
        const { flow } = getState()
        let flowClone = {
            ...flow.flowData,
            ...result
        }
        
        dispatch({
            type: RELOCATE_ITEM,
            payload: flowClone
        })
    } 
}

export function addNewStory(text) {
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

export function addPhaseToStory(phaseId, storyKey) {
    return (dispatch, getState) => {
        let flowClone = getState().flow.flowData[storyKey]
        
        flowClone.unshift(phaseId)

        dispatch({
            type: ADD_PHASE_TO_STORY,
            payload: {
                storyKey,
                flowClone
            }
        })
    }
}

export function deleteStory(storyIndex) {
    return (dispatch, getState) => {
        const { flow, flowData } = getState().flow
        let flowClone = Array.from(flow)
        let flowDataClone = {}
        flowDataClone = Object.assign(flowDataClone, flowData)
        
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
        case REORDER_STORY:
            return { ...state, flow: action.payload }
        case REORDER_ITEM:
            return { ...state, flowData: { ...state.flowData, [action.payload.key]: action.payload.items } }
        case RELOCATE_ITEM:
            return { ...state, flowData: action.payload }

        case ADD_NEW_STORY:
            return { ...state, flow: [ ...state.flow, action.payload.story ],
                flowData: { ...state.flowData, [action.payload.uid]: [] } }
        case ADD_PHASE_TO_STORY:
            return { ...state, flowData: { ...state.flowData, [action.payload.storyKey]: action.payload.storyClone }}
        case DELETE_STORY:
            return { ...state, flow: action.payload.flow, flowData: action.payload.flowData }
        default:
            return state;
    }
}