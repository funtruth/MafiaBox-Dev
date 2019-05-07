import React from 'react'
import './home.css'
import { Route, Switch } from 'react-router-dom'

import SideBarView from './sidebar/SideBarView';
import HeaderView from './header/HeaderView';

import LandingView from './landing/LandingView'
import PatchView from '../board/patch/PatchView';
import PhaseFlowView from '../board/phases/PhaseFlowView';
import TestHubView from '../testhub/TestHubView'
import WindowPageView from '../page/WindowPageView'
import EventView from '../board/views/EventView'

export default function HomeView(props) {
    return (
        <div className="home-view">
            <SideBarView {...props}/>
            <div style={{ flex: 1, flexDirection: 'column', display: 'flex', overflow: 'auto' }}>
                <HeaderView {...props}/>
                <Switch>
                    <Route exact path="/" component={LandingView}/>
                    <Route exact path="/:projectKey" component={PatchView}/>
                    <Route exact path="/:projectKey/mode/:modeKey" component={PhaseFlowView}/>

                    <Route exact path="/:projectKey/roles" component={PatchView}/>
                    <Route exact path="/:projectKey/roles/:storyKey/:pageKey" component={WindowPageView}/>
                    <Route exact path="/:projectKey/phases/:storyKey" component={PhaseFlowView}/>
                    <Route exact path="/:projectKey/phases/:storyKey/:pageKey" component={WindowPageView}/>
                    <Route exact path="/:projectKey/events" component={EventView}/>
                    <Route exact path="/:projectKey/testhub" component={TestHubView}/>
                </Switch>
            </div>
        </div>
    )
}