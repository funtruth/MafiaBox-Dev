import React from 'react'
import './SideBarView.css'
import _ from 'lodash'
import firebase from 'firebase'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { developType } from '../../navigation/paths'

import { navigate } from '../../navigation/NavReducer'

import AccountDetails from '../components/AccountDetails';
import ProjectDetails from '../components/ProjectDetails';

function SideBarView(props) {
    const { location, path } = props

    let renderRedirect = () => {
        if (location.pathname !== path) {
            return (
                <Redirect to={path}/>
            )
        }
    }
    
    let handleClick = (item) => props.navigate(`/${item.key}`)

    let renderItem = (item) => {
        let path = location.pathname
        let paths = path.split('/')
        let selected = item.key === paths[1]

        return (
            <div
                key={item.key}
                className="side-bar-item"
                onClick={() => handleClick(item)}
                style={{
                    color: selected && '#fff',
                }}
            >
                <i className={`${item.icon} side-bar-icon`}></i>
                <div className="side-bar-title">{item.label}</div>
            </div>
        )
    }

    const items = _.sortBy(developType, i => i.index)

    return (
        <div className="side-bar-view">
            <AccountDetails {...props}/>
            <div className="side-bar-section-title">Project</div>
            <ProjectDetails {...props}/>
            <div className="side-bar-section-title">Develop</div>
            {items.map(renderItem)}
            {renderRedirect()}
        </div>
    )
}

export default connect(
    state => ({
        path: state.nav.path,
        authUser: state.firebase.authUser,
        activeProject: state.firebase.activeProject,
        projects: state.firebase.projects,
    }),
    {
        navigate,
    }
)(SideBarView)