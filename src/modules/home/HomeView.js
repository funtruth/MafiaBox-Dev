import React from 'react'
import './home.css'
import { Route } from 'react-router-dom'

import SideBarView from './SideBarView';
import HeaderView from './HeaderView';

import LandingView from './LandingView'
import StoryView from '../story/StoryView';
import FlowView from '../flow/FlowView'
import RoleCardView from '../roleCard/RoleCardView';
import TestHubView from '../testhub/TestHubView'
import PageContainer from '../page/PageContainer'

class HomeView extends React.Component{
    render() {
        return (
            <div className="home-view">
                <SideBarView location={this.props.location}/>
                <div>
                    <HeaderView location={this.props.location}/>
                    <div>
                        <Route exact path="/" component={LandingView}/>
                        <Route exact path="/board" component={StoryView}/>
                        <Route exact path="/board/:pageKey" component={PageContainer}/>
                        <Route exact path="/defaults" component={RoleCardView}/>
                        <Route exact path="/flow" component={FlowView}/>
                        <Route exact path="/flow/:pageKey" component={PageContainer}/>
                        <Route exact path="/testhub" component={TestHubView}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomeView