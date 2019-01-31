import React from 'react'
import './home.css'
import { Route } from 'react-router-dom'

import SideBarView from './SideBarView';
import HeaderView from './HeaderView';

import LandingView from './LandingView'
import FunctionView from '../board/views/FunctionView'
import StoryView from '../board/views/StoryView';
import FlowView from '../board/views/FlowView'
import WindowTemplateView from '../template/WindowTemplateVIew'
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
                        <Route exact path="/library" component={FunctionView}/>
                        <Route exact path="/library/:pageKey" component={FunctionView}/>
                        <Route exact path="/roles" component={StoryView}/>
                        <Route exact path="/roles/:pageKey" component={WindowPageView}/>
                        <Route exact path="/defaults/:boardType" component={WindowTemplateView}/>
                        <Route exact path="/phases" component={FlowView}/>
                        <Route exact path="/phases/:pageKey" component={WindowPageView}/>
                        <Route exact path="/events" component={EventView}/>
                        <Route exact path="/testhub" component={TestHubView}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomeView