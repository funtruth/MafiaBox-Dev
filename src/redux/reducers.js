import { combineReducers } from 'redux'

import UserReducer from '../modules/user/UserReducer'
import ModalReducer from '../modules/modal/ModalReducer'
import NavReducer from '../modules/navigation/NavReducer'
import PageReducer from '../modules/page/PageReducer'
import DropdownReducer from '../modules/dropdown/DropdownReducer'
import FieldReducer from '../modules/fields/FieldReducer'
import BoardReducer from '../modules/board/BoardReducer'

const reducers = {
    user: UserReducer,
    modal: ModalReducer,
    nav: NavReducer,
    page: PageReducer,
    dropdown: DropdownReducer,
    field: FieldReducer,
    board: BoardReducer,
}

export default combineReducers( reducers )