import { combineReducers } from 'redux'

import UserReducer from '../modules/user/UserReducer'
import RoleReducer from '../modules/roles/RoleReducer'
import RoleCardReducer from '../modules/roleCard/RoleCardReducer'
import ModalReducer from '../modules/modal/ModalReducer'
import NavReducer from '../modules/navigation/NavReducer'
import PageReducer from '../modules/page/PageReducer'
import DropdownReducer from '../modules/app/menu/DropdownReducer'
import FieldReducer from '../modules/fields/FieldReducer'

const reducers = {
    user: UserReducer,
    roles: RoleReducer,
    roleCard: RoleCardReducer,
    modal: ModalReducer,
    nav: NavReducer,
    page: PageReducer,
    dropdown: DropdownReducer,
    field: FieldReducer,
}

export default combineReducers( reducers )