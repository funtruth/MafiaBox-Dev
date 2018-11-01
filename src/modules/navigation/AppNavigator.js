import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from '../../redux/store'
import Shell from './Shell'
import LibraryView from '../library/LibraryView'

export default class AppNavigator extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <BrowserRouter>
                        <div>
                            <Shell/>
                            <Route exact path="/" component={LibraryView}/>
                        </div>
                    </BrowserRouter>
                </PersistGate>
            </Provider>
        )
    }
}