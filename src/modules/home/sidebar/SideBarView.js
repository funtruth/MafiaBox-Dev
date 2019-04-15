import React from 'react'
import './SideBarView.css'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { develmathType } from '../../navigation/paths'

import { navigate } from '../../navigation/NavReducer'

import AccountDetails from '../components/AccountDetails';
import ProjectDetails from '../components/ProjectDetails';
import SideBarTitle from '../components/SideBarTitle'

function SideBarView(props) {
    const { location, path, activeProject } = props
    const { pathname } = location

    let renderRedirect = () => {
        if (pathname !== path) {
            return (
                <Redirect to={path}/>
            )
        }
    }
    
    let handleClick = (item) => {
        if (!activeProject) {
            return;
        }
        props.navigate("/" + activeProject + "/" + item.key)
    }

    let renderItem = (item) => {
        let paths = pathname.split('/')
        let selected = item.key === paths[2]

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

    const items = _.sortBy(develmathType, i => i.index)

    return (
        <div className="side-bar-view">
            <AccountDetails {...props}/>
            <SideBarTitle>Project</SideBarTitle>
            <ProjectDetails {...props}/>
            <SideBarTitle>Develop</SideBarTitle>
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
        userProjects: state.firebase.userProjects,
    }),
    {
        navigate,
    }
)(SideBarView)