import React from 'react'
import './home.css'
import { Route, Switch } from 'react-router-dom'

import SideBarView from './sidebar/SideBarView';
import HeaderView from './header/HeaderView';

import LandingView from './landing/LandingView'
import GameView from './game/GameView';
import PatchView from '../board/patch/PatchView';
import ModeView from '../board/phases/ModeView';
import WindowPageView from '../page/WindowPageView'

export default function HomeView(props) {
    return (
        <div className="home-view">
            <SideBarView pathname={props.location.pathname}/>
            <div style={{ flex: 1, flexDirection: 'column', display: 'flex', overflow: 'auto' }}>
                <HeaderView {...props}/>
                <Switch>
                    <Route exact path="/" component={LandingView}/>
                    <Route exact path="/:projectKey" component={GameView}/>
                    <Route exact path="/:projectKey/:board" component={PatchView}/>
                    <Route exact path="/:projectKey/modes/:pageKey" component={ModeView}/>
                    <Route exact path="/:projectKey/roles/:pageKey" component={WindowPageView}/>
                    <Route exact path="/:projectKey/phases/:pageKey" component={WindowPageView}/>
                </Switch>
            </div>
        </div>
    )
}