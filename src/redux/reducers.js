import { combineReducers } from 'redux'

import AppReducer from '../modules/app/AppReducer'
import DropdownReducer from '../modules/dropdown/DropdownReducer'
import FirebaseReducer from '../modules/firebase/FirebaseReducer'
import LogicReducer from '../modules/logic/LogicReducer'
import ModalReducer from '../modules/modal/ModalReducer'
import NavReducer from '../modules/app/NavReducer'
import PageReducer from '../modules/page/PageReducer'

const reducers = {
    app: AppReducer,
    dropdown: DropdownReducer,
    firebase: FirebaseReducer,
    logic: LogicReducer,
    modal: ModalReducer,
    nav: NavReducer,
    page: PageReducer,
}

export default combineReducers(reducers)