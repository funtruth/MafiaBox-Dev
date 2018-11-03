import { combineReducers } from 'redux'

import UserReducer from '../modules/user/UserReducer'
import RoleReducer from '../modules/roles/RoleReducer'
import ModalReducer from '../modules/modal/ModalReducer'

const reducers = {
    user: UserReducer,
    roles: RoleReducer,
    modal: ModalReducer,
}

export default combineReducers( reducers )