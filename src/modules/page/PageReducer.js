const initialState = {
    pageMap: {}
}

const ADD_PAGE = 'page/add-page'
const REMOVE_PAGE = 'page/remove-page'
const UPDATE_PAGE = 'page/update-page'

export function addPage(obj) {
    return (dispatch) => {
        dispatch({
            type: ADD_PAGE,
            payload: obj
        })
    }
}

export function removePage(pageKey) {
    return (dispatch, getState) => {
        const { pageMap } = getState().page
        let pageMapClone = {}
        
        Object.assign(pageMapClone, pageMap)
        delete pageMapClone[pageKey]

        dispatch({
            type: REMOVE_PAGE,
            payload: pageMapClone
        })
    }
}

export function updatePage(pageKey, field, newValue) {
    return (dispatch, getState) => {
        const { pageMap } = getState().page
        let pageInfo = {
            ...pageMap[pageKey],
            [field]: newValue,
        }

        dispatch({
            type: UPDATE_PAGE,
            payload: pageInfo
        })
    }
}

export default (state = initialState, action) => {
    switch(action.type){
        case ADD_PAGE:
            return { ...state, pageMap: { ...state.pageMap, [action.payload.pageKey]: action.payload }}
        case REMOVE_PAGE:
            return { ...state, pageMap: action.payload }
        case UPDATE_PAGE:
            return { ...state, pageMap: { ...state.pageMap, [action.payload.pageKey]: action.payload }}
        default:
            return state;
    }
}