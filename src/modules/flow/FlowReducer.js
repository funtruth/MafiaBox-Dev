import * as helpers from '../roles/helpers'
import { modalType } from '../modal/modalConfig'
import { showModalByKey } from '../modal/ModalReducer';

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

    flowInfo: {},
    defaultInfo: {},
}

const REORDER_STORY = 'flow/reorder-story'
const REORDER_ITEM = 'flow/reorder-item'
const RELOCATE_ITEM = 'flow/relocate-item'

const ADD_NEW_STORY = 'flow/add-new-story'
const ADD_NEW_PHASE = 'flow/add-new-phase'
const ADD_PHASE_TO_STORY = 'flow/add-phase-to-story'
const DELETE_STORY = 'flow/delete-story'

const UPDATE_PHASE_INFO = 'flow/update-phase-info'

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

export function addNewPhase(phaseInfo = {}) {
    return(dispatch, getState) => {
        const { flowInfo, defaultInfo } = getState().flow

        let uid = helpers.genUID('phase')
        while(flowInfo[uid]) {
            uid = helpers.genUID('phase')
        }
        
        dispatch({
            type: ADD_NEW_PHASE,
            payload: {
                ...defaultInfo,
                ...phaseInfo,
                phaseId: uid,
            }
        })

        dispatch(showModalByKey(modalType.editPhase, { phaseId: uid }))
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

export function addPhaseToStory(phaseId, storyKey) {
    return (dispatch, getState) => {
        let storyClone = getState().flow.flowData[storyKey]
        
        storyClone.unshift(phaseId)

        dispatch({
            type: ADD_PHASE_TO_STORY,
            payload: {
                storyKey,
                storyClone
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

export function updatePhaseInfo(id, field, value) {
    return (dispatch) => {

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

        case ADD_NEW_PHASE:
            return { ...state, flowData: { ...state.flowData, [action.payload.phaseStoryKey] : [ action.payload.phaseId, ...state.flowData[action.payload.phaseStoryKey]] },
                flowInfo: { ...state.flowInfo, [action.payload.phaseId]: action.payload}}
        case ADD_NEW_STORY:
            return { ...state, flow: [ ...state.flow, action.payload.story ],
                flowData: { ...state.flowData, [action.payload.uid]: [] } }
        case ADD_PHASE_TO_STORY:
            return { ...state, flowData: { ...state.flowData, [action.payload.storyKey]: action.payload.storyClone }}
        case DELETE_STORY:
            return { ...state, flow: action.payload.flow, flowData: action.payload.flowData }
    
        case UPDATE_PHASE_INFO:
            return { ...state }
        default:
            return state;
    }
}