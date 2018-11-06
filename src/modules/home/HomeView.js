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
                <SideBarView location={this.props.location}/>
                <div>
                    <HeaderView location={this.props.location}/>
                    <div>
                        <Route exact path="/board" component={StoryView}/>
                        <Route exact path="/board/:roleId" component={RoleView}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomeView