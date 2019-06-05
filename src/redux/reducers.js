import { combineReducers } from 'redux'

import AppReducer from '../modules/app/AppReducer'
import DropdownReducer from '../modules/dropdown/DropdownReducer'
import FirebaseReducer from '../modules/firebase/FirebaseReducer'
import ModalReducer from '../modules/modal/ModalReducer'
import NavReducer from '../modules/app/NavReducer'
import PageReducer from '../modules/page/PageReducer'

const reducers = {
    app: AppReducer,
    dropdown: DropdownReducer,
    firebase: FirebaseReducer,
    modal: ModalReducer,
    nav: NavReducer,
    page: PageReducer,
}

export default combineReducers(reducers)