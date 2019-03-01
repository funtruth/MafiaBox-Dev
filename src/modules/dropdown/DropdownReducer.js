import _ from 'lodash'
import { dropdownType, DROP_TITLE_HEIGHT } from './types'

const initialState = {
    dropdownKeys: [],
    statefulSource: '',
}

const UPDATE_KEYS = 'dropdown/update-keys'
const UPDATE_SOURCE = 'dropdown/update-source'

export function showDropdown(key, e, params={}, index=0, statefulSourceId="") {
    return (dispatch, getState) => {
        const { dropdownKeys, statefulSource } = getState().dropdown
        const { modalKeys } = getState().modal

        if (!key) {
            if (!dropdownKeys.length) return

            dispatch({
                type: UPDATE_KEYS,
                payload: [],
            })
            dispatch({
                type: UPDATE_SOURCE,
                payload: '',
            })
        } else {
            let keysClone = _.cloneDeep(dropdownKeys).slice(0, index + 1)

            const prev = keysClone[keysClone.length - 1]
            if (keysClone.length) {
                let offsetY = 0
                switch(key) {
                    case dropdownType.assignVar:
                    case dropdownType.declareVar:
                    case dropdownType.pageLib:
                    case dropdownType.pickComparison:
                    case dropdownType.pickBoolean:
                    case dropdownType.pickDeleteMode:
                    case dropdownType.pickEventVarProp:
                    case dropdownType.pickHealth:
                    case dropdownType.pickOperator:
                    case dropdownType.pickOpType:
                    case dropdownType.pickTimer:
                    case dropdownType.pickUid:
                    case dropdownType.pickUpdate:
                    case dropdownType.pickVarProp:
                    case dropdownType.pickVarType:
                    case dropdownType.pickRecipient:
                    case dropdownType.pickReturnType:
                    case dropdownType.showSubfields:
                    case dropdownType.storyMapLib:
                        offsetY = DROP_TITLE_HEIGHT
                        break
                    default:
                }

                keysClone.push({
                    ...modalKeys[modalKeys.length - 1],
                    ...prev,
                    ...params,
                    pageX: prev.pageX + e.target.offsetWidth,
                    pageY: e.pageY - (e.pageY - prev.pageY - e.target.offsetTop) % e.target.offsetHeight - 8 - offsetY,
                    key,
                })
            } else {
                let offsetX = 0, offsetY = 0
                switch(e.type) {
                    case 'click':
                        offsetX = e.offsetX
                        offsetY = e.offsetY
                        break
                    case 'mouseover':
                        offsetX = e.nativeEvent.offsetX
                        offsetY = e.nativeEvent.offsetY
                        break
                    default:
                }

                keysClone.push({
                    ...modalKeys[modalKeys.length - 1],
                    ...prev,
                    ...params,
                    pageX: e.pageX - offsetX - 8,
                    pageY: e.pageY - offsetY + e.target.offsetHeight,
                    key,
                })
            }

            dispatch({
                type: UPDATE_KEYS,
                payload: keysClone,
            })
            if (!statefulSource) {
                dispatch({
                    type: UPDATE_SOURCE,
                    payload: statefulSourceId,
                })
            }
        }  
    }
}

export function popDropdownTo(index) {
    return (dispatch, getState) => {
        const { dropdownKeys } = getState().dropdown

        const keysClone = _.cloneDeep(dropdownKeys).slice(0, index + 1)

        dispatch({
            type: UPDATE_KEYS,
            payload: keysClone,
        })
    }
}

export default (state = initialState, action) => {
    switch(action.type){
        case UPDATE_KEYS:
            return { ...state, dropdownKeys: action.payload }
        case UPDATE_SOURCE:
            return { ...state, statefulSource: action.payload }
        default:
            return state;
    }
}