import React from 'react'
import './home.css'
import { Route } from 'react-router-dom'

import SideBarView from './SideBarView';
import StoryView from '../story/StoryView';
import RoleView from '../roles/RoleView';
import HeaderView from './HeaderView';

class HomeView extends React.Component{
    render() {
        return (
            <div className="home-view">
                <SideBarView/>
                <div style={{ width: '100%' }}>
                    <HeaderView location={this.props.location}/>
                    <div style={{ padding: 8, paddingTop: 0 }}>
                        <Route exact path="/home" component={StoryView}/>
                        <Route exact path="/home/edit" component={RoleView}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomeView