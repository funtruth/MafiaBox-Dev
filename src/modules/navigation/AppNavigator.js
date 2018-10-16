import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from '../../redux/store'
import LoadingScreen from '../loading/LoadingScreen';
import LoginScreen from '../login/LoginScreen'

export default class AppNavigator extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <BrowserRouter>
                        <div>
                            <Route exact component={LoadingScreen}/>
                            <Route path="/" component={LoginScreen}/>
                        </div>
                    </BrowserRouter>
                </PersistGate>
            </Provider>
        )
    }
}