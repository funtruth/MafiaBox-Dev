import React from 'react'
import './home.css'
import { Route } from 'react-router-dom'

import SideBarView from './SideBarView';
import HeaderView from './HeaderView';

import LandingView from './LandingView'
import LibraryView from '../board/views/LibraryView'
import StoryView from '../board/views/StoryView';
import FlowView from '../board/views/FlowView'
import RoleCardView from '../roleCard/RoleCardView';
import TestHubView from '../testhub/TestHubView'
import WindowPageView from '../page/WindowPageView'
import EventView from '../board/views/EventView'

class HomeView extends React.Component{
    render() {
        return (
            <div className="home-view">
                <SideBarView location={this.props.location}/>
                <div>
                    <HeaderView location={this.props.location}/>
                    <div>
                        <Route exact path="/" component={LandingView}/>
                        <Route exact path="/library" component={LibraryView}/>
                        <Route exact path="/board" component={StoryView}/>
                        <Route exact path="/board/:pageKey" component={WindowPageView}/>
                        <Route exact path="/defaults" component={RoleCardView}/>
                        <Route exact path="/flow" component={FlowView}/>
                        <Route exact path="/flow/:pageKey" component={WindowPageView}/>
                        <Route exact path="/events" component={EventView}/>
                        <Route exact path="/testhub" component={TestHubView}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomeView