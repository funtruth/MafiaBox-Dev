import React from 'react'
import './styles.css'

import SideBarView from './screen/SideBarView';
import DetailView from './screen/DetailView';
import AddRoleView from './screen/AddRoleView';

class LibraryView extends React.Component{
    render() {
        return (
            <div className="home-view">
                <SideBarView/>
                <div style={{ flex: 0.75 }}>
                    <DetailView/>
                    <AddRoleView/>
                </div>
            </div>
        )
    }
}

export default LibraryView

