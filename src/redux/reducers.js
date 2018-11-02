import { combineReducers } from 'redux'

import UserReducer from '../modules/user/UserReducer'
import LibraryReducer from '../modules/library/LibraryReducer'
import ModalReducer from '../modules/modal/ModalReducer'

const reducers = {
    user: UserReducer,
    library: LibraryReducer,
    modal: ModalReducer,
}

export default combineReducers( reducers )