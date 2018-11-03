import React from 'react'
import './styles.css'
import { connect } from 'react-redux'
import firebase from '../../services/firebase'
import { Route } from 'react-router-dom'

import SideBarView from './screen/SideBarView';
import EditRoleHeader from './components/EditRoleHeader'
import StoryView from '../story/StoryView';
import EditRoleView from './screen/EditRoleView';

class LibraryView extends React.Component{
    componentDidMount() {
        firebase.database().ref(`dev/MAF`).once('value', snap => {

        })
    }

    render() {
        return (
            <div className="home-view">
                <SideBarView/>
                <div style={{ width: '100%' }}>
                    <EditRoleHeader/>
                    <div>
                        <Route exact path="/home" component={StoryView}/>
                        <Route exact path="/home/edit" component={EditRoleView}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    null,
    {

    }
)(LibraryView)