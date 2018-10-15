import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import LoadingScreen from '../loading/LoadingScreen';
import LoginScreen from '../login/LoginScreen'

export default class AppNavigator extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact component={LoadingScreen}/>
                    <Route path="/" component={LoginScreen}/>
                </div>
            </BrowserRouter>
        )
    }
}