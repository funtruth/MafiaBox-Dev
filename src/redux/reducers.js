import { combineReducers } from 'redux'

import UserReducer from '../modules/user/UserReducer'
import RoleReducer from '../modules/roles/RoleReducer'
import ModalReducer from '../modules/modal/ModalReducer'
import StoryReducer from '../modules/story/StoryReducer'
import NavReducer from '../modules/navigation/NavReducer'

const reducers = {
    user: UserReducer,
    roles: RoleReducer,
    modal: ModalReducer,
    story: StoryReducer,
    nav: NavReducer,
}

export default combineReducers( reducers )