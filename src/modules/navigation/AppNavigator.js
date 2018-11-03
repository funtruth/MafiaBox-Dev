import React from 'react'
import '../common/colors.css'
import '../common/buttons.css'
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from '../../redux/store'
import Shell from './Shell'
import LibraryView from '../library/LibraryView'
import ModalView from '../modal/ModalView'

export default class AppNavigator extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Shell/>
                    <BrowserRouter>
                        <div>
                            <Route exact path="/" component={LibraryView}/>
                            <ModalView/>
                        </div>
                    </BrowserRouter>
                </PersistGate>
            </Provider>
        )
    }
}