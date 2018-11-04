const initialState = {
    stories: [
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

    storyData: {
        inProgress: ['Doctor', 'Hunter'],
        complete: ['Venom', 'Striker', 'Mafia'],
        live: [],
    }
}

const REORDER_BOARD = 'story/reorder-board'
const REORDER_ITEM = 'story/reorder-item'
const RELOCATE_ITEM = 'story/relocate-item'

export function reorderBoard(items) {
    return (dispatch) => {
        dispatch({
            type: REORDER_BOARD,
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
        const { story } = getState()
        let storyClone = {
            ...story.storyData,
            ...result
        }
        
        dispatch({
            type: RELOCATE_ITEM,
            payload: storyClone
        })
    } 
}

export default (state = initialState, action) => {
    switch(action.type){
        case REORDER_BOARD:
            return { ...state, stories: action.payload }
        case REORDER_ITEM:
            return { ...state, storyData: { ...state.storyData, [action.payload.key]: action.payload.items } }
        case RELOCATE_ITEM:
            return { ...state, storyData: action.payload }
        default:
            return state;
    }
}