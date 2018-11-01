import React from 'react'
import { Route } from 'react-router-dom'
import './styles.css'
import SideBarView from './components/SideBarView';
import DetailView from './components/DetailView';
import AddRoleView from './components/AddRoleView';

class LibraryView extends React.Component{
    render() {
        return (
            <div className="home-view">
                <SideBarView/>
                <div style={{ flex: 0.75 }}>
                    <Route exact path="/" component={DetailView}/>
                    <Route path="/addrole" component={AddRoleView}/>
                </div>
            </div>
        )
    }
}

export default LibraryView

