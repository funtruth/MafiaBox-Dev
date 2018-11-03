const initialState = {
    stories: ['inProgress', 'complete'],

    storyData: {
        inProgress: ['Doctor', 'Hunter'],
        complete: ['Venom', 'Striker', 'Mafia']
    }
}

const REORDER_STORIES = 'story/reorder-stories'
const MOVE_STORY = 'story/move-story'

export function reorderStories(items) {
    return (dispatch) => {
        dispatch({
            type: REORDER_STORIES,
            payload: items
        })
    }
}

export function moveStory(result) {
    return (dispatch) => {
        dispatch({
            type: REORDER_STORIES,
            payload: result
        })
    } 
}

export default (state = initialState, action) => {
    switch(action.type){
        case REORDER_STORIES:
            return { ...state, stories: action.payload }
        case MOVE_STORY:
            return { ...state, storyData: Object.assign(action.payload, state.storyData) }
        default:
            return state;
    }
}