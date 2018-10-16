import React from 'react'
import './styles.css'
import firebase from '../../services/firebase'
import { Redirect } from 'react-router-dom'

class HomeView extends React.Component{
    componentDidMount() {
        setTimeout(() => {
            firebase.auth().signOut()
        }, 1000)
    }

    _handleBack() {
        return <Redirect to="/"/>
    }

    render() {
        return (
            <div className="home-view">
                {this._handleBack()}
            </div>
        )
    }
}

export default HomeView

