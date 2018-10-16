import { combineReducers } from 'redux'

import UserReducer from '../modules/user/UserReducer'

const reducers = {
    user: UserReducer,
}

export default combineReducers( reducers )