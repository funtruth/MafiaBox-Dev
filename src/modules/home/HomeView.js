import React from 'react'
import './home.css'
import { Route, Switch } from 'react-router-dom'

import SideBarView from './sidebar/SideBarView';
import HeaderView from './header/HeaderView';

import LandingView from './landing/LandingView'
import DashboardView from './dashboard/DashboardView'
import FunctionView from '../board/views/FunctionView'
import StoryView from '../board/views/StoryView';
import FlowView from '../board/views/FlowView'
import WindowTemplateView from '../template/WindowTemplateVIew'
import TestHubView from '../testhub/TestHubView'
import WindowPageView from '../page/WindowPageView'
import EventView from '../board/views/EventView'

export default function HomeView(props) {
    return (
        <div className="home-view">
            <SideBarView {...props}/>
            <div style={{ flex: 1, flexDirection: 'column', display: 'flex', }}>
                <HeaderView {...props}/>
                <Switch>
                    <Route exact path="/" component={LandingView}/>
                    <Route exact path="/:projectKey" component={DashboardView}/>
                    <Route exact path="/:projectKey/library" component={FunctionView}/>
                    <Route exact path="/:projectKey/library/:pageKey" component={FunctionView}/>
                    <Route exact path="/:projectKey/roles" component={StoryView}/>
                    <Route exact path="/:projectKey/roles/:pageKey" component={WindowPageView}/>
                    <Route exact path="/:projectKey/defaults/:boardType" component={WindowTemplateView}/>
                    <Route exact path="/:projectKey/phases" component={FlowView}/>
                    <Route exact path="/:projectKey/phases/:pageKey" component={WindowPageView}/>
                    <Route exact path="/:projectKey/events" component={EventView}/>
                    <Route exact path="/:projectKey/testhub" component={TestHubView}/>
                </Switch>
            </div>
        </div>
    )
}