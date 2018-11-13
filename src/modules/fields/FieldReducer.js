import { initFieldMap, initFieldRepo } from './defaults'

const initialState = {
    fieldMap: initFieldMap,
    fieldRepo: initFieldRepo,
}


export default (state = initialState, action) => {
    switch(action.type){
        default:
            return state;
    }
}