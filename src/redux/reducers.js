import { combineReducers } from 'redux'

import UserReducer from '../modules/user/UserReducer'
import LibraryReducer from '../modules/library/LibraryReducer'

const reducers = {
    user: UserReducer,
    library: LibraryReducer,
}

export default combineReducers( reducers )