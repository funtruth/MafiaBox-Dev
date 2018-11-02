import React from 'react'
import './styles.css'
import { connect } from 'react-redux'
import firebase from '../../services/firebase'

import { cleanRoles } from './LibraryReducer'

import SideBarView from './screen/SideBarView';
import EditRoleView from './screen/EditRoleView';
import TemplateView from './screen/TemplateView';

class LibraryView extends React.Component{
    componentDidMount() {
        this.props.cleanRoles()
        firebase.database().ref(`dev/MAF`).once('value', snap => {

        })
    }

    render() {
        return (
            <div className="home-view">
                <SideBarView/>
                <div style={{ width: '100%' }}>
                    <EditRoleView/>
                    <TemplateView/>
                </div>
            </div>
        )
    }
}

export default connect(
    null,
    {
        cleanRoles,
    }
)(LibraryView)