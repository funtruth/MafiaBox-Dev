import _ from 'lodash'
import { logicType } from './types'
var beautify_js = require('js-beautify');

const initialState = {
}

const ADD_FIELD = 'field/add-field'

//add field to the current fieldMap
export function addField(fieldMapKey, text) {
    return (dispatch, getState) => {
    }
}

export function getCode(key, library) {
    if (!key || !library[key] || !library[key].logicType) return
    const type = library[key].logicType

    return beautify_js(`${logicType[type].code(library[key].data, 
        library[key].right ? getCode(library[key].right, library) : '')}
        ${library[key].down ? getCode(library[key].down, library) : ''}`)
}

export default (state = initialState, action) => {
    switch(action.type){
        default:
            return state;
    }
}