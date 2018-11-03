import { combineReducers } from 'redux'

import UserReducer from '../modules/user/UserReducer'
import RoleReducer from '../modules/roles/RoleReducer'
import ModalReducer from '../modules/modal/ModalReducer'
import StoryReducer from '../modules/story/StoryReducer'

const reducers = {
    user: UserReducer,
    roles: RoleReducer,
    modal: ModalReducer,
    story: StoryReducer,
}

export default combineReducers( reducers )