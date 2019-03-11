import { combineReducers } from 'redux'

import AppReducer from '../modules/app/AppReducer'
import DBReducer from '../modules/firebase/DBReducer'
import DropdownReducer from '../modules/dropdown/DropdownReducer'
import FieldReducer from '../modules/fields/FieldReducer'
import FunctionReducer from '../modules/functions/FunctionReducer'
import ModalReducer from '../modules/modal/ModalReducer'
import NavReducer from '../modules/navigation/NavReducer'
import PageReducer from '../modules/page/PageReducer'
import TemplateReducer from '../modules/template/TemplateReducer'

const reducers = {
    app: AppReducer,
    db: DBReducer,
    dropdown: DropdownReducer,
    field: FieldReducer,
    functions: FunctionReducer,
    modal: ModalReducer,
    nav: NavReducer,
    page: PageReducer,
    template: TemplateReducer,
}

export default combineReducers(reducers)