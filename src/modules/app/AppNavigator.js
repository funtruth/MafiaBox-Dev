import React from 'react'
import '../common/styles.css'
import '../common/animations.css'
import { HashRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from '../../redux/store'
import Shell from './Shell'
import AppWrapper from './AppWrapper'
import HomeView from '../home/HomeView'
import DropdownView from '../dropdown/DropdownView'
import ModalView from '../modal/ModalView'

export default function AppNavigator(props) {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Shell>
                    <AppWrapper>
                        <HashRouter>
                            <div style={{ display: 'flex', flex: 1 }}>
                                <Route path="/" component={HomeView}/>
                                <Route path="/" component={DropdownView}/>
                                <Route path="/" component={ModalView}/>
                            </div>
                        </HashRouter>
                    </AppWrapper>
                </Shell>
            </PersistGate>
        </Provider>
    )
}