import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from '../../redux/store'
import AuthView from '../auth/AuthView';
import HomeView from '../home/HomeView'

export default class AppNavigator extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <BrowserRouter>
                        <div>
                            <Route exact path="/" component={AuthView}/>
                            <Route path="/home" component={HomeView}/>
                        </div>
                    </BrowserRouter>
                </PersistGate>
            </Provider>
        )
    }
}