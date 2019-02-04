import { combineReducers } from 'redux'

import AppReducer from '../modules/app/AppReducer'
import UserReducer from '../modules/user/UserReducer'
import ModalReducer from '../modules/modal/ModalReducer'
import NavReducer from '../modules/navigation/NavReducer'
import PageReducer from '../modules/page/PageReducer'
import DropdownReducer from '../modules/dropdown/DropdownReducer'
import FieldReducer from '../modules/fields/FieldReducer'
import TemplateReducer from '../modules/template/TemplateReducer'
import DBReducer from '../modules/firebase/DBReducer'
import FunctionReducer from '../modules/functions/FunctionReducer'

const reducers = {
    app: AppReducer,
    user: UserReducer,
    modal: ModalReducer,
    nav: NavReducer,
    page: PageReducer,
    dropdown: DropdownReducer,
    field: FieldReducer,
    template: TemplateReducer,
    db: DBReducer,
    functions: FunctionReducer,
}

export default combineReducers( reducers )