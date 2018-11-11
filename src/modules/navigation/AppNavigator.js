import React from 'react'
import '../common/colors.css'
import '../common/buttons.css'
import '../common/styles.css'
import '../common/animations.css'
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from '../../redux/store'
import Shell from './Shell'
import AppWrapper from '../app/AppWrapper'
import HomeView from '../home/HomeView'
import DropdownView from '../app/menu/DropdownView'
import ModalView from '../modal/ModalView'

export default class AppNavigator extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Shell/>
                    <AppWrapper>
                        <BrowserRouter>
                            <div>
                                <Route path="/" component={HomeView}/>
                                <Route path="/" component={DropdownView}/>
                                <Route path="/" component={ModalView}/>
                            </div>
                        </BrowserRouter>
                    </AppWrapper>
                </PersistGate>
            </Provider>
        )
    }
}