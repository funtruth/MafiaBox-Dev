import * as helpers from '../common/helpers'

const initialState = {
    storyMap: [
        {
            key: 'inProgress',
            title: 'In Progress',
            palette: 'palette-yellow',
            default: true,
        },
        {
            key: 'complete',
            title: 'Complete',
            palette: 'palette-blue',
            default: true,
        },
        {
            key: 'live',
            title: 'Live',
            palette: 'palette-green',
            default: true,
        }
    ],
}

const ADD_NEW_STORY = 'story/add-new-story'
const ADD_ROLE_TO_STORY = 'story/add-role-to-story'
const DELETE_STORY = 'story/delete-story'

const MOVE_STORY = 'story/move-story'

export function moveStory(startIndex, endIndex) {
    return (dispatch, getState) => {
        const { storyMap } = getState().story
        let storyMapClone = Array.from(storyMap)

        const [removed] = storyMapClone.splice(startIndex, 1)
        storyMapClone.splice(endIndex, 0, removed)
        
        dispatch({
            type: MOVE_STORY,
            payload: storyMapClone
        })
    }
}

export function addNewStory(text) {
    return (dispatch, getState) => {
        const { storyData } = getState().story
        let textNoSpace = text.replace(/\s/g, '').toLowerCase()
        let textUID = helpers.genUID(textNoSpace)

        while(storyData[textUID]) {
            textUID = helpers.genUID(textNoSpace)
        }

        let story = {
            key: textUID,
            title: text,
            palette: 'light-grey',
            default: false,
        }

        dispatch({
            type: ADD_NEW_STORY,
            payload: {
                uid: textUID,
                story,
            }
        })
    }
}

export function addRoleToStory(roleId, storyKey) {
    return (dispatch, getState) => {
        let storyClone = getState().story.storyData[storyKey]
        
        storyClone.unshift(roleId)

        dispatch({
            type: ADD_ROLE_TO_STORY,
            payload: {
                storyKey,
                storyClone
            }
        })
    }
}

export function deleteStory(storyIndex) {
    return (dispatch, getState) => {
        const { stories, storyData } = getState().story
        let storiesClone = Array.from(stories)
        let storyDataClone = {}
        storyDataClone = Object.assign(storyDataClone, storyData)
        
        let storyId = storiesClone[storyIndex].key
        storiesClone.splice(storyIndex, 1)
        delete storyDataClone[storyId]
        
        dispatch({
            type: DELETE_STORY,
            payload: {
                stories: storiesClone,
                storyData: storyDataClone,
            }
        })
    }
}

export default (state = initialState, action) => {
    switch(action.type){
        case ADD_NEW_STORY:
            return { ...state, stories: [ ...state.stories, action.payload.story ],
                storyData: { ...state.storyData, [action.payload.uid]: [] } }
        case ADD_ROLE_TO_STORY:
            return { ...state, storyData: { ...state.storyData, [action.payload.storyKey]: action.payload.storyClone }}
        case DELETE_STORY:
            return { ...state, stories: action.payload.stories, storyData: action.payload.storyData }
            
        case MOVE_STORY:
            return { ...state, storyMap: action.payload }
        default:
            return state;
    }
}