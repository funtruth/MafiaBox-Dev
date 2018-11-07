import { combineReducers } from 'redux'

import UserReducer from '../modules/user/UserReducer'
import RoleReducer from '../modules/roles/RoleReducer'
import RoleCardReducer from '../modules/roleCard/RoleCardReducer'
import ModalReducer from '../modules/modal/ModalReducer'
import StoryReducer from '../modules/story/StoryReducer'
import NavReducer from '../modules/navigation/NavReducer'
import FlowReducer from '../modules/flow/FlowReducer'

const reducers = {
    user: UserReducer,
    roles: RoleReducer,
    roleCard: RoleCardReducer,
    modal: ModalReducer,
    story: StoryReducer,
    nav: NavReducer,
    flow: FlowReducer,
}

export default combineReducers( reducers )