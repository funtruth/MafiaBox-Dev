import React from 'react'
import './styles.css'

import SideBarView from './screen/SideBarView';
import EditRoleView from './screen/EditRoleView';
import TemplateView from './screen/TemplateView';

class LibraryView extends React.Component{
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

export default LibraryView

