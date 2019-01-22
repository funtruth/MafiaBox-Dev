import { combineReducers } from 'redux'

import UserReducer from '../modules/user/UserReducer'
import ModalReducer from '../modules/modal/ModalReducer'
import NavReducer from '../modules/navigation/NavReducer'
import PageReducer from '../modules/page/PageReducer'
import DropdownReducer from '../modules/dropdown/DropdownReducer'
import FieldReducer from '../modules/fields/FieldReducer'
import TemplateReducer from '../modules/template/TemplateReducer'
import DBReducer from '../modules/firebase/DBReducer'

const reducers = {
    user: UserReducer,
    modal: ModalReducer,
    nav: NavReducer,
    page: PageReducer,
    dropdown: DropdownReducer,
    field: FieldReducer,
    template: TemplateReducer,
    db: DBReducer,
}

export default combineReducers( reducers )